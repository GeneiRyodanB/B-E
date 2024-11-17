from typing import Dict, List, Optional, Tuple, Set
import json
import re
import os
from datetime import datetime
from difflib import get_close_matches
from collections import Counter
import string
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import wordnet, brown
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk
from nltk.tree import Tree

# Download required NLTK resources
def initialize_nltk():
    """Initialize NLTK by downloading required resources"""
    required_resources = [
        'punkt',
        'averaged_perceptron_tagger',
        'maxent_ne_chunker',
        'words',
        'wordnet',
        'brown',
        'punkt_tab'
    ]
    
    print("Checking and downloading required NLTK resources...")
    for resource in required_resources:
        try:
            nltk.data.find(f'tokenizers/{resource}' if 'punkt' in resource else resource)
            print(f"Resource '{resource}' is already downloaded.")
        except LookupError:
            print(f"Downloading '{resource}'...")
            nltk.download(resource, quiet=True)
            print(f"Successfully downloaded '{resource}'.")
        
class OCRCleaner:
    """Base OCR cleaning functionality"""
    
    # Basic OCR replacements
    OCR_REPLACEMENTS = {
        'l': 'i',     # lowercase L to i
        '0': 'O',     # zero to O
        '1': 'I',     # one to I
        '5': 'S',     # five to S
        '8': 'B',     # eight to B
        'rn': 'm',    # 'rn' to 'm'
        'll': 'll',   # double l fixing
        '|': 'I',     # pipe to I
    }
    
    # Basic sequence patterns
    SEQUENCE_PATTERNS = [
        (r'(?<=[a-z])1(?=[a-z])', 'l'),  # 1 between lowercase letters
        (r'(?<=[A-Z])0(?=[A-Z])', 'O'),  # 0 between uppercase letters
        (r'(?<=\d)O(?=\d)', '0'),        # O between numbers
    ]

    @staticmethod
    def fix_common_ocr_errors(text: str) -> str:
        """Basic OCR error correction"""
        # Apply simple replacements
        for wrong, right in OCRCleaner.OCR_REPLACEMENTS.items():
            text = re.sub(f'(?<![a-z]){wrong}(?![a-z])', right, text)
        
        # Apply sequence patterns
        for pattern, replacement in OCRCleaner.SEQUENCE_PATTERNS:
            text = re.sub(pattern, replacement, text)
        
        return text

    @staticmethod
    def basic_clean(text: str) -> str:
        """Basic text cleaning"""
        text = OCRCleaner.fix_common_ocr_errors(text)
        text = re.sub(r'\s+', ' ', text)  # normalize whitespace
        return text.strip()

class AdvancedLinguisticAnalyzer:
    """Advanced linguistic analysis for OCR text"""
    
    def __init__(self, domain: Optional[str] = None):
        self.domain = domain
        self.domain_terms = self._load_domain_terms(domain)
        self.brown_words = set(word.lower() for word in brown.words())
        self.common_words = set(nltk.corpus.words.words())
        
        # Build frequency distribution from Brown corpus for word probability
        self.word_freq = nltk.FreqDist(word.lower() for word in brown.words())
        
        # Common sentence structures (Subject-Verb-Object patterns)
        self.valid_sentence_patterns = [
            r'DT? (JJ |JJR |JJS )*(NN |NNS |NNP |NNPS )+(VB |VBD |VBG |VBN |VBP |VBZ )+',
            r'PRP (VB |VBD |VBG |VBN |VBP |VBZ )+',
            r'WDT |WP |WRB .+(VB |VBD |VBG |VBN |VBP |VBZ )+',
        ]
    
    def _load_domain_terms(self, domain: Optional[str]) -> Set[str]:
        """Load domain-specific terminology"""
        domain_terms = set()
        
        # Add general academic and technical terms
        domain_terms.update([
            'theorem', 'hypothesis', 'analysis', 'methodology', 'algorithm',
            'paradigm', 'theory', 'framework', 'implementation', 'structure'
        ])
        
        # Domain-specific terms
        domain_dictionaries = {
            'medical': [
                'diagnosis', 'prognosis', 'etiology', 'pathology', 'syndrome',
                'chronic', 'acute', 'benign', 'malignant', 'idiopathic'
            ],
            'technical': [
                'algorithm', 'database', 'interface', 'protocol', 'bandwidth',
                'latency', 'throughput', 'middleware', 'architecture', 'framework'
            ],
            'scientific': [
                'hypothesis', 'experiment', 'variable', 'correlation', 'causation',
                'methodology', 'analysis', 'synthesis', 'derivative', 'integral'
            ],
            'legal': [
                'statute', 'jurisdiction', 'precedent', 'plaintiff', 'defendant',
                'tort', 'liability', 'prosecution', 'litigation', 'verdict'
            ]
        }
        
        if domain and domain in domain_dictionaries:
            domain_terms.update(domain_dictionaries[domain])
            
            # Add related terms from WordNet
            for term in domain_dictionaries[domain]:
                synsets = wordnet.synsets(term)
                for synset in synsets:
                    domain_terms.update(lemma.name() for lemma in synset.lemmas())
        
        return domain_terms

    def analyze_sentence_structure(self, sentence: str) -> Dict:
        """
        Perform detailed analysis of sentence structure
        """
        tokens = word_tokenize(sentence)
        pos_tags = pos_tag(tokens)
        
        # Create POS tag string for pattern matching
        pos_string = ' '.join(tag for word, tag in pos_tags)
        
        analysis = {
            'structure_type': 'unknown',
            'complexity': 0,
            'completeness': 0,
            'grammatical_elements': {},
            'named_entities': [],
            'issues': []
        }
        
        # Check sentence patterns
        for pattern in self.valid_sentence_patterns:
            if re.search(pattern, pos_string):
                analysis['structure_type'] = 'valid'
                break
        
        # Analyze grammatical elements
        elements = {
            'subject': False,
            'verb': False,
            'object': False,
            'prepositions': 0,
            'adjectives': 0,
            'adverbs': 0
        }
        
        current_chunk = []
        for word, tag in pos_tags:
            if tag.startswith('NN'):
                elements['subject'] = True
            elif tag.startswith('VB'):
                elements['verb'] = True
            elif tag in ['IN', 'TO']:
                elements['prepositions'] += 1
            elif tag.startswith('JJ'):
                elements['adjectives'] += 1
            elif tag.startswith('RB'):
                elements['adverbs'] += 1
        
        analysis['grammatical_elements'] = elements
        
        # Named Entity Recognition
        named_entities = ne_chunk(pos_tags)
        if isinstance(named_entities, Tree):
            for subtree in named_entities:
                if isinstance(subtree, Tree):
                    entity_text = ' '.join(word for word, tag in subtree.leaves())
                    analysis['named_entities'].append({
                        'text': entity_text,
                        'type': subtree.label()
                    })
        
        # Calculate complexity score
        complexity_factors = [
            len(tokens),
            elements['prepositions'],
            elements['adjectives'],
            elements['adverbs'],
            len(analysis['named_entities'])
        ]
        analysis['complexity'] = sum(complexity_factors) / len(complexity_factors)
        
        # Calculate completeness score
        required_elements = ['subject', 'verb']
        optional_elements = ['object', 'prepositions', 'adjectives', 'adverbs']
        
        completeness = sum(1 for elem in required_elements if elements[elem])
        completeness += sum(1 for elem in optional_elements if elements[elem] > 0)
        analysis['completeness'] = completeness / (len(required_elements) + len(optional_elements))
        
        return analysis

    def verify_word(self, word: str) -> Tuple[str, float]:
        """
        Advanced word verification with confidence scoring
        """
        word = word.strip()
        if not word:
            return word, 0.0
            
        word_lower = word.lower()
        confidence = 0.0
        
        # Check domain-specific terms
        if word_lower in self.domain_terms:
            return word, 1.0
        
        # Check common words
        if word_lower in self.common_words:
            confidence = self.word_freq.freq(word_lower)
            return word, min(1.0, confidence * 1000)  # Normalize frequency
        
        # Check Brown corpus
        if word_lower in self.brown_words:
            confidence = self.word_freq.freq(word_lower)
            return word, min(0.9, confidence * 1000)  # Slightly lower confidence
        
        # Try WordNet
        if wordnet.synsets(word_lower):
            return word, 0.8
        
        # Try fuzzy matching
        matches = get_close_matches(word_lower, self.common_words.union(self.domain_terms), n=1, cutoff=0.8)
        if matches:
            return matches[0], 0.6
        
        # If still no match, try character-based similarity
        for valid_word in self.domain_terms:
            if len(valid_word) == len(word) and sum(a != b for a, b in zip(valid_word, word_lower)) <= 2:
                return valid_word, 0.4
        
        return word, 0.1

class EnhancedOCRCleaner(OCRCleaner):
    """Enhanced OCR cleaner with advanced linguistic analysis"""
    
    def __init__(self, domain: Optional[str] = None):
        self.linguistic_analyzer = AdvancedLinguisticAnalyzer(domain)
    
    def clean_and_analyze_text(self, text: str) -> Tuple[str, Dict]:
        """
        Clean text and provide detailed linguistic analysis
        """
        # Basic OCR cleaning
        cleaned_text = self.fix_common_ocr_errors(text)
        
        # Split into sentences
        sentences = sent_tokenize(cleaned_text)
        
        # Analyze each sentence
        sentence_analyses = []
        cleaned_sentences = []
        
        for sentence in sentences:
            # Clean and verify words in sentence
            words = word_tokenize(sentence)
            cleaned_words = []
            word_confidences = []
            
            for word in words:
                cleaned_word, confidence = self.linguistic_analyzer.verify_word(word)
                cleaned_words.append(cleaned_word)
                word_confidences.append(confidence)
            
            cleaned_sentence = ' '.join(cleaned_words)
            cleaned_sentences.append(cleaned_sentence)
            
            # Analyze sentence structure
            structure_analysis = self.linguistic_analyzer.analyze_sentence_structure(cleaned_sentence)
            
            sentence_analyses.append({
                'original': sentence,
                'cleaned': cleaned_sentence,
                'word_confidence': sum(word_confidences) / len(word_confidences),
                'structure_analysis': structure_analysis
            })
        
        # Compile overall analysis
        analysis = {
            'sentence_level': {
                'total_sentences': len(sentences),
                'average_complexity': sum(sa['structure_analysis']['complexity'] 
                                       for sa in sentence_analyses) / len(sentences),
                'average_completeness': sum(sa['structure_analysis']['completeness'] 
                                         for sa in sentence_analyses) / len(sentences),
                'average_confidence': sum(sa['word_confidence'] 
                                       for sa in sentence_analyses) / len(sentences)
            },
            'detailed_analysis': sentence_analyses
        }
        
        return ' '.join(cleaned_sentences), analysis

# Update the BookParser class to use the enhanced cleaner:
class BookParser:
    def __init__(self, file_path: str, domain: Optional[str] = None):
        self.file_path = file_path
        self.ocr_cleaner = EnhancedOCRCleaner(domain)
        self.content = self._read_and_clean_file()

    def _read_file(self) -> str:
        """Read file with multiple encoding attempts"""
        encodings = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']
        errors = []
        
        for encoding in encodings:
            try:
                with open(self.file_path, 'r', encoding=encoding) as file:
                    content = file.read()
                    print(f"Successfully read file using {encoding} encoding")
                    return content
            except UnicodeDecodeError as e:
                errors.append(f"{encoding}: {str(e)}")
                continue
            except Exception as e:
                errors.append(f"Unexpected error with {encoding}: {str(e)}")
                continue
                
        raise ValueError(f"Could not read {self.file_path} with any supported encoding. "
                        f"Errors: {'; '.join(errors)}")

    def _read_and_clean_file(self) -> str:
        """Read and clean the file content"""
        raw_content = self._read_file()
        cleaned_content, self.linguistic_analysis = self.ocr_cleaner.clean_and_analyze_text(raw_content)
        return cleaned_content

    def parse(self) -> Dict:
        """Parse the book content into structured format"""
        # Extract metadata (you can expand this based on your needs)
        metadata = {
            'filename': os.path.basename(self.file_path),
            'processing_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'word_count': len(self.content.split()),
        }

        # Split into chapters (basic implementation - you can make this more sophisticated)
        chapters = self._split_into_chapters()

        return {
            'metadata': metadata,
            'linguistic_analysis': self.linguistic_analysis,
            'chapters': chapters,
            'statistics': {
                'total_chapters': len(chapters),
                'average_chapter_length': sum(len(ch['content'].split()) for ch in chapters) // len(chapters) if chapters else 0,
                'total_words': metadata['word_count']
            }
        }

    def _split_into_chapters(self) -> List[Dict]:
        """Split the content into chapters"""
        # This is a basic implementation - you might want to make it more sophisticated
        chapter_patterns = [
            r'(?i)^chapter\s+\d+',  # Matches "Chapter 1", "CHAPTER 2", etc.
            r'(?i)^[IVX]+\.',       # Matches Roman numerals with period
            r'(?i)^\d+\.',          # Matches numeric chapter numbers with period
        ]
        
        chapters = []
        current_content = self.content

        # Try each pattern until we find one that works
        for pattern in chapter_patterns:
            splits = re.split(f'({pattern})', current_content)
            if len(splits) > 1:
                # First part might be introduction/preface
                if splits[0].strip():
                    chapters.append({
                        'title': 'Introduction',
                        'content': splits[0].strip(),
                        'chapter_number': 0
                    })

                # Process the rest of the chapters
                for i in range(1, len(splits), 2):
                    if i + 1 < len(splits):
                        title = splits[i].strip()
                        content = splits[i + 1].strip()
                        if title and content:
                            chapters.append({
                                'title': title,
                                'content': content,
                                'chapter_number': len(chapters) + 1
                            })
                break  # If we found chapters, stop trying other patterns

        # If no chapters found, treat the entire content as a single chapter
        if not chapters:
            chapters.append({
                'title': 'Content',
                'content': self.content.strip(),
                'chapter_number': 1
            })

        return chapters

# Example usage:
def convert_book_to_json(input_file: str, domain: Optional[str] = None, output_file: Optional[str] = None):
    """Convert a book file to JSON with OCR cleaning and linguistic analysis"""
    try:
        # Create parser and process the book
        parser = BookParser(input_file, domain)
        book_data = parser.parse()
        
        # Determine output file name if not provided
        if not output_file:
            output_file = os.path.splitext(input_file)[0] + '.json'
        
        # Save to JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(book_data, f, indent=2, ensure_ascii=False)
        
        # Print summary
        print(f"\nConversion complete!")
        print(f"Input file: {input_file}")
        print(f"Output file: {output_file}")
        print(f"\nSummary:")
        print(f"- Total chapters: {book_data['statistics']['total_chapters']}")
        print(f"- Total words: {book_data['statistics']['total_words']}")
        print(f"- Average chapter length: {book_data['statistics']['average_chapter_length']} words")
        
        if 'linguistic_analysis' in book_data:
            analysis = book_data['linguistic_analysis']['sentence_level']
            print(f"\nLinguistic Analysis:")
            print(f"- Average sentence complexity: {analysis['average_complexity']:.2f}")
            print(f"- Average sentence completeness: {analysis['average_completeness']:.2f}")
            print(f"- Average word confidence: {analysis['average_confidence']:.2f}")
        
    except Exception as e:
        print(f"Error converting file: {str(e)}")
        raise
    
# Usage:
if __name__ == "__main__":
    initialize_nltk()
    # Example for history domain text
    convert_book_to_json('/Users/mac-Z22HBENM/Desktop/Learning/History/Timeline/ai_scripts/examples/morocco-that-was_Walter-Harris_MINI_VERSION.txt', domain="history")