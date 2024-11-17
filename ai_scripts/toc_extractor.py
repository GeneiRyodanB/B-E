import re
from typing import List, Dict, Tuple
from dataclasses import dataclass

@dataclass
class TOCEntry:
    level: int
    title: str
    page: int
    number: str = ""  # Store I, II, III, etc.

class TOCExtractor:
    def __init__(self):
        self.roman_numerals = {
            'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
            'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
            'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15
        }
        
        # Expanded patterns for section numbers
        self.section_patterns = [
            r'^(?:Chapter|CHAPTER)\s+([IVXLCDM]+|[0-9]+)',  # Chapter I, Chapter 1
            r'^([IVXLCDM]+)\.?\s+',  # I., II., etc.
            r'^([0-9]+)\.?\s+',  # 1., 2., etc.
            r'^[A-Z]+\.',  # A., B., etc.
        ]

    def clean_title(self, title: str) -> str:
        """Clean and normalize title text."""
        # Remove multiple spaces
        title = re.sub(r'\s+', ' ', title)
        # Remove dots used for spacing
        title = re.sub(r'\s*\.+\s*$', '', title)
        # Remove leading/trailing spaces
        title = title.strip()
        # Remove leading roman numerals and dots
        title = re.sub(r'^[IVXLCDM]+\.\s*', '', title)
        return title

    def extract_page_number(self, line: str) -> Tuple[str, int]:
        """Extract page number and clean the line."""
        # Look for numbers at the end of the line
        page_match = re.search(r'.*?(\d+)\s*$', line.strip())
        if page_match:
            page_num = int(page_match.group(1))
            # Remove everything after the last letter until the number
            title = re.sub(r'\s*[.—_\s]+\d+\s*$', '', line)
            return title.strip(), page_num
        return line.strip(), -1

    def is_roman_numeral(self, text: str) -> bool:
        """Check if text is a valid Roman numeral."""
        text = text.strip('. ')
        return text.upper() in self.roman_numerals

    def extract_section_number(self, line: str) -> Tuple[str, str]:
        """Extract section number (roman or decimal) from line."""
        line = line.strip()
        
        # Check for Roman numerals at start
        roman_match = re.match(r'^([IVXLCDM]+)\.?\s+', line)
        if roman_match:
            number = roman_match.group(1)
            rest = line[roman_match.end():].strip()
            return number, rest
            
        # Check for decimal numbers
        decimal_match = re.match(r'^(\d+)\.?\s+', line)
        if decimal_match:
            number = decimal_match.group(1)
            rest = line[decimal_match.end():].strip()
            return number, rest
            
        return "", line

    def extract_toc(self, text: str) -> List[TOCEntry]:
        """Extract table of contents entries from text."""
        lines = text.split('\n')
        toc_entries = []
        in_toc_section = False
        previous_level = 0
        
        for line in lines:
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
                
            # Detect start of TOC
            if re.match(r'^(?:CONTENTS|Table of Contents|Contents)', line, re.IGNORECASE):
                in_toc_section = True
                continue
                
            if in_toc_section:
                # Skip lines that look like headers or separators
                if re.match(r'^[-—_=]+$', line) or line.count('.') > 10:
                    continue
                    
                # Extract and clean the line
                number, content = self.extract_section_number(line)
                title, page = self.extract_page_number(content)
                
                # Skip if we don't have enough information
                if not title or page < 0:
                    continue
                
                # Determine level based on format and indentation
                level = 0
                if number:
                    # Main entries often have roman numerals
                    if self.is_roman_numeral(number):
                        level = 0
                    else:
                        level = 1
                else:
                    # Check if it's an all-caps entry (likely a main section)
                    if title.isupper():
                        level = 0
                    else:
                        level = 1
                
                # Clean up the title
                title = self.clean_title(title)
                
                if title:  # Only add if we have a title
                    toc_entries.append(TOCEntry(level, title, page, number))
        
        return toc_entries

    def format_toc(self, entries: List[TOCEntry]) -> str:
        """Format TOC entries into a clean string."""
        formatted = "CONTENTS\n\n"
        
        for entry in entries:
            # Format the line
            indent = "  " * entry.level
            number_part = f"{entry.number}. " if entry.number else ""
            title_part = f"{number_part}{entry.title}"
            
            # Calculate dots
            dots_count = max(3, 60 - len(indent) - len(title_part) - len(str(entry.page)))
            dots = "." * dots_count
            
            # Format the line
            formatted += f"{indent}{title_part} {dots} {entry.page}\n"
        
        return formatted

def process_file(input_file: str, output_file: str):
    """Process a file and extract its table of contents."""
    try:
        # Read input file
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()
        
        # Extract TOC
        extractor = TOCExtractor()
        toc_entries = extractor.extract_toc(text)
        
        # Format and save TOC
        formatted_toc = extractor.format_toc(toc_entries)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(formatted_toc)
        
        print(f"Table of Contents extracted and saved to {output_file}")
        print("\nExtracted TOC Preview:")
        print("-" * 60)
        print(formatted_toc)
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def main():
    while True:
        print("\nTable of Contents Extractor")
        print("1. Extract TOC from file")
        print("2. Test on sample text")
        print("3. Quit")
        
        choice = input("\nEnter your choice (1-3): ")
        
        if choice == '1':
            input_file = input("Enter input file path: ")
            output_file = input("Enter output file path (or press Enter for auto-name): ")
            
            if not output_file:
                output_file = input_file.rsplit('.', 1)[0] + '_toc.txt'
            
            process_file(input_file, output_file)
            
        elif choice == '2':
            print("Enter sample text (end with empty line):")
            lines = []
            while True:
                line = input()
                if not line:
                    break
                lines.append(line)
            
            text = '\n'.join(lines)
            extractor = TOCExtractor()
            toc_entries = extractor.extract_toc(text)
            formatted_toc = extractor.format_toc(toc_entries)
            
            print("\nExtracted TOC:")
            print("-" * 60)
            print(formatted_toc)
            
        elif choice == '3':
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()