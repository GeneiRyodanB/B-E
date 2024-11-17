from deep_translator import GoogleTranslator
import re
import os
import time

def translate_local_book(file_path, target_lang='fr'):
    """
    Reads a book from a local text file and translates it while preserving chapter structure.
    
    Args:
        file_path (str): Path to the local text file
        target_lang (str): Target language code (e.g., 'fr' for French)
    """
    print(f"Reading file: {file_path}")
    
    try:
        # Try different encodings if needed
        encodings = ['utf-8', 'latin-1', 'cp1252']
        content = None
        
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding) as file:
                    content = file.read()
                print(f"Successfully read file with {encoding} encoding")
                break
            except UnicodeDecodeError:
                continue
                
        if content is None:
            raise ValueError("Could not read the file with any of the attempted encodings")
    
        # Pattern for detecting titles - multiple approaches combined
        title_pattern = re.compile(
            r'(?mx)'                     # m: multiline, x: verbose mode
            r'(?:'                       # Start of non-capturing group for different title formats
            r'^\s*[A-Z][A-Z\s]+[A-Z]\s*$'  # All caps title on its own line
            r'|'                         # OR
            r'^\s*[A-Z][a-zA-Z\s]+\s*\d+\s*$'  # Title followed by page number
            r'|'                         # OR
            r'^\s*[A-Z][a-zA-Z\s,]+\n'  # Title starting with capital, followed by newline
            r')'
        )
        
        # Split content and get titles
        chapters = title_pattern.split(content)
        chapter_titles = title_pattern.findall(content)
        
        # Remove empty chapters and clean titles
        chapters = [chap.strip() for chap in chapters if chap.strip()]
        chapter_titles = [title.strip() for title in chapter_titles if title.strip()]
        
        # Print detected chapters for verification
        print("\nDetected chapters:")
        for i, title in enumerate(chapter_titles, 1):
            print(f"{i}. {title}")
        
        # Ask for confirmation
        response = input("\nProceed with translation? (yes/no): ").lower()
        if response != 'yes':
            print("Translation cancelled.")
            return
        
        # Prepare translator
        translator = GoogleTranslator(source='auto', target=target_lang)
        
        # Create output directory
        output_dir = "translated_book"
        os.makedirs(output_dir, exist_ok=True)
        
        # Translate and save
        print("\nTranslating chapters...")
        with open(f"{output_dir}/full_translation.txt", 'w', encoding='utf-8') as full_file:
            # Write table of contents
            full_file.write("TABLE OF CONTENTS\n\n")
            for i, title in enumerate(chapter_titles, 1):
                translated_title = translator.translate(title.strip())
                full_file.write(f"{i}. {translated_title}\n")
            full_file.write("\n\n")
            
            # Translate each chapter
            for i, (chapter, title) in enumerate(zip(chapters, chapter_titles), 1):
                print(f"Translating chapter {i}/{len(chapters)}")
                
                # Translate title
                translated_title = translator.translate(title.strip())
                
                # Translate content in chunks
                chunk_size = 4000  # Adjust based on API limits
                chapter_chunks = [chapter[i:i+chunk_size] 
                                for i in range(0, len(chapter), chunk_size)]
                
                translated_chunks = []
                for chunk in chapter_chunks:
                    if chunk.strip():  # Only translate non-empty chunks
                        translated_chunk = translator.translate(chunk.strip())
                        translated_chunks.append(translated_chunk)
                        time.sleep(1)  # Respect API rate limits
                
                translated_content = ' '.join(translated_chunks)
                
                # Save individual chapter
                with open(f"{output_dir}/chapter_{i}.txt", 'w', encoding='utf-8') as f:
                    f.write(f"{translated_title}\n\n")
                    f.write(translated_content)
                    f.write("\n\n")
                
                # Add to full book
                full_file.write(f"{translated_title}\n\n")
                full_file.write(translated_content)
                full_file.write("\n\n")
                
        print(f"\nTranslation completed! Files saved in {output_dir}/")
        print(f"- Individual chapters are in separate files")
        print(f"- Complete translated book is in full_translation.txt")
                
    except FileNotFoundError:
        print(f"Error: Could not find file at {file_path}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage:
translate_local_book('/Users/mac-Z22HBENM/Desktop/Learning/History/Timeline/ai_scripts/examples/morocco-that-was_Walter-Harris.txt', 'ar')