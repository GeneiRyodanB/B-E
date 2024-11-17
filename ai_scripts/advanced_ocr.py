import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
import pdf2image
from PyPDF2 import PdfReader
import re
from spellchecker import SpellChecker
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
import string
import json

class TextCorrector:
    def __init__(self):
        """Initialize text correction tools"""
        self.spell = SpellChecker()
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')

    def fix_spelling(self, text):
        """Correct spelling errors"""
        words = word_tokenize(text)
        corrected_words = []
        
        for word in words:
            # Skip punctuation, numbers, and short words
            if (word in string.punctuation or 
                word.isdigit() or 
                len(word) <= 2):
                corrected_words.append(word)
                continue
            
            # Check if word is misspelled
            if not self.spell.known([word.lower()]):
                # Get the correction
                correction = self.spell.correction(word.lower())
                if correction:
                    # Preserve original capitalization
                    if word.istitle():
                        correction = correction.title()
                    elif word.isupper():
                        correction = correction.upper()
                    corrected_words.append(correction)
                else:
                    corrected_words.append(word)
            else:
                corrected_words.append(word)

        # Reconstruct text
        return ' '.join(corrected_words)

    def process_text(self, text):
        """Apply all text corrections"""
        # Fix basic formatting
        text = ' '.join(text.split())
        
        # Fix line breaks
        text = re.sub(r'(?<!\n\n)\n(?!\n)', ' ', text)
        text = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', text)
        
        # Fix common OCR errors
        text = self.fix_common_ocr_errors(text)
        
        # Fix spelling
        text = self.fix_spelling(text)
        
        # Fix final formatting
        text = self.fix_formatting(text)
        
        return text.strip()

    def fix_common_ocr_errors(self, text):
        """Fix common OCR misrecognitions"""
        replacements = {
            'l1': 'll',
            '1l': 'll',
            '0O': '00',
            'O0': '00',
            'rn': 'm',
            'vv': 'w'
        }
        
        for old, new in replacements.items():
            text = text.replace(old, new)
        
        return text

    def fix_formatting(self, text):
        """Fix formatting issues"""
        # Fix spacing around punctuation
        text = re.sub(r'\s+([,.!?])', r'\1', text)
        text = re.sub(r'([,.!?])(?=[^\s])', r'\1 ', text)
        
        # Fix spacing after periods
        text = re.sub(r'\.(?=[A-Z])', '. ', text)
        
        # Normalize quotes
        text = text.replace('"', '"').replace('"', '"')
        text = text.replace(''', "'").replace(''', "'")
        
        return text.strip()

class AdvancedOCR:
    def __init__(self, tesseract_path=None, dpi=300):
        """Initialize OCR with text correction"""
        if tesseract_path:
            pytesseract.pytesseract.tesseract_cmd = tesseract_path
        else:
            # Set default Tesseract path for Mac
            pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'
        self.dpi = dpi
        self.text_corrector = TextCorrector()

    def process_image(self, image, lang='eng'):
        """Process image with text correction"""
        # Convert to grayscale
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image

        # Apply thresholding
        thresh = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, 11, 2
        )

        # Extract text
        custom_config = r'--oem 3 --psm 6'
        raw_text = pytesseract.image_to_string(
            thresh, lang=lang, config=custom_config
        )

        # Correct text
        corrected_text = self.text_corrector.process_text(raw_text)

        # Get confidence
        data = pytesseract.image_to_data(
            thresh, lang=lang, config=custom_config,
            output_type=pytesseract.Output.DICT
        )
        confidences = [conf for conf in data['conf'] if conf != -1]
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0

        return {
            'raw_text': raw_text.strip(),
            'corrected_text': corrected_text,
            'confidence': round(avg_confidence, 2),
            'language': lang
        }

    def process_pdf(self, pdf_path, lang='eng'):
        """Process PDF with text correction"""
        results = {'pages': []}
        
        try:
            images = pdf2image.convert_from_path(pdf_path, dpi=self.dpi)
            
            for i, image in enumerate(images, 1):
                # Convert PIL Image to OpenCV format
                opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
                
                # Process the image
                result = self.process_image(opencv_image, lang)
                result['page'] = i
                results['pages'].append(result)

            results['total_pages'] = len(images)
            return results

        except Exception as e:
            return {'error': str(e), 'pages': []}

    def process_file(self, file_path, output_path=None, lang='eng'):
        """Process file and save results"""
        try:
            # Process the file
            if file_path.lower().endswith('.pdf'):
                result = self.process_pdf(file_path, lang)
            else:
                image = cv2.imread(file_path)
                if image is None:
                    raise ValueError(f"Could not read file: {file_path}")
                result = self.process_image(image, lang)

            # Save results if output path is provided
            if output_path:
                output_dir = os.path.dirname(output_path)
                if output_dir and not os.path.exists(output_dir):
                    os.makedirs(output_dir)

                # Save as JSON
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(result, f, ensure_ascii=False, indent=2)

                # Save text version
                txt_path = os.path.splitext(output_path)[0] + '.txt'
                with open(txt_path, 'w', encoding='utf-8') as f:
                    if isinstance(result.get('corrected_text'), str):
                        f.write(result['corrected_text'])
                    elif 'pages' in result:
                        for page in result['pages']:
                            f.write(f"--- Page {page['page']} ---\n")
                            f.write(page['corrected_text'])
                            f.write('\n\n')

            return result

        except Exception as e:
            return {
                'error': str(e),
                'file_type': 'unknown',
                'text': None
            }

# Example usage
if __name__ == "__main__":
    # Initialize OCR tool
    ocr = AdvancedOCR()
    
    # Process a file with text correction
    result = ocr.process_file(
        '/Users/mac-Z22HBENM/Desktop/Learning/History/Timeline/ai_scripts/examples/moroccothatwas00harrrich-1-31.pdf',
        output_path='/Users/mac-Z22HBENM/Desktop/Learning/History/Timeline/ai_scripts/examples/corrected_moroccothatwas00harrrich-1-31.json'
    )
    
    if 'error' not in result:
        if 'pages' in result:
            print(f"Processed {result['total_pages']} pages")
            for page in result['pages']:
                print(f"\nPage {page['page']}:")
                print(f"Confidence: {page['confidence']}%")
                print("Corrected text sample:")
                print(page['corrected_text'][:200] + "...")
        else:
            print(f"Confidence: {result['confidence']}%")
            print("Corrected text sample:")
            print(result['corrected_text'][:200] + "...")
