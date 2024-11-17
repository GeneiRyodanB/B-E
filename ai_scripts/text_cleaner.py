import re

def join_hyphenated_words(text):
    """
    Joins hyphenated words that are split across lines, removing page numbers
    and titles that appear in between.
    """
    # First, join all lines into a single string while preserving important breaks
    text = re.sub(r'-\s*\n\s*([a-zA-Z])', r'\1', text)
    
    # Remove isolated letters and page numbers with titles between hyphenated words
    text = re.sub(r'-\s*[A-Z]\s*\d+\s*[A-Z\s]+\s*([a-zA-Z])', r'\1', text)
    
    return text

def clean_text(input_file, output_file):
    """
    Cleans and reorganizes text from OCR output, handling hyphenated words,
    page numbers, and maintaining proper spacing.
    """
    try:
        # Read the input file
        print(f"Reading file: {input_file}")
        with open(input_file, 'r', encoding='utf-8') as file:
            text = file.read()
        
        # Initial cleaning steps
        
        # 1. Handle hyphenated words first
        text = join_hyphenated_words(text)
        
        # 2. Extract the main title if it exists
        title_match = re.search(r'\d+\s+([A-Z\s]+(?:[A-Z\s]+))', text)
        main_title = title_match.group(1).strip() if title_match else None
        
        # 3. Remove page numbers and titles that interrupt sentences
        text = re.sub(r'\s*\d+\s+[A-Z\s]+\s*', ' ', text)
        
        # 4. Remove isolated single letters
        text = re.sub(r'\s+[A-Z]\s+', ' ', text)
        
        # 5. Normalize spaces
        text = ' '.join(text.split())
        
        # 6. Fix quotation marks with proper spacing
        text = re.sub(r'\s*"\s*([^"]+)\s*"\s*', r' "\1" ', text)
        
        # 7. Fix multiple spaces
        text = re.sub(r'\s{2,}', ' ', text)
        
        # 8. Add proper paragraph breaks
        text = re.sub(r'(?<=[.!?])\s+', '\n\n', text)
        
        # 9. Clean up any remaining artifacts
        text = re.sub(r'\s*\n\s*', '\n', text)  # Clean line breaks
        text = re.sub(r'\n{3,}', '\n\n', text)  # Normalize paragraph spacing
        
        # Save cleaned text
        print(f"Saving cleaned text to: {output_file}")
        with open(output_file, 'w', encoding='utf-8') as file:
            # Add the main title at the top if found
            if main_title:
                file.write(f"{main_title}\n\n")
            file.write(text)
            
        print("Text cleaning completed successfully!")
        
        # Show a preview
        print("\nSample of cleaned text:")
        print("-" * 50)
        print(text[:500])
        print("-" * 50)
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def test_cleaning(text):
    """
    Test the cleaning on a single string and return the result.
    """
    # Handle hyphenation
    text = join_hyphenated_words(text)
    
    # Remove page numbers and titles
    text = re.sub(r'\s*\d+\s+[A-Z\s]+\s*', ' ', text)
    
    # Remove isolated letters
    text = re.sub(r'\s+[A-Z]\s+', ' ', text)
    
    # Normalize spaces
    text = ' '.join(text.split())
    
    return text.strip()

def main():
    while True:
        print("\nOptions:")
        print("1. Clean a file")
        print("2. Test a single line")
        print("3. Quit")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == '1':
            input_file = input("Enter the path to your text file: ")
            
            if not os.path.exists(input_file):
                print("File not found. Please check the path and try again.")
                continue
            
            file_name = os.path.splitext(input_file)[0]
            output_file = f"{file_name}_cleaned.txt"
            clean_text(input_file, output_file)
            
        elif choice == '2':
            test_line = input("Enter a line to test: ")
            result = test_cleaning(test_line)
            print("\nCleaned result:")
            print("-" * 50)
            print(result)
            print("-" * 50)
            
        elif choice == '3':
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    import os
    print("Book Text Cleaner")
    print("----------------")
    main()
    print("Thank you for using the text cleaner!")