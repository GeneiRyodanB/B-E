from deep_translator import GoogleTranslator
import time
import os

def translate_to_arabic(input_file, output_file):
    """
    Translates a text file to Arabic using free translation method and saves the result.
    
    Parameters:
    input_file (str): Path to the input text file
    output_file (str): Path where the translated text will be saved
    """
    try:
        # Read the input file
        print(f"Reading file: {input_file}")
        with open(input_file, 'r', encoding='utf-8') as file:
            text = file.read()
        
        # Split text into smaller chunks to avoid limitations
        # Each chunk should be less than 5000 characters
        chunk_size = 4000
        chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
        
        # Translate each chunk
        translated_chunks = []
        total_chunks = len(chunks)
        
        print("Starting translation...")
        for i, chunk in enumerate(chunks, 1):
            print(f"Translating chunk {i} of {total_chunks}...")
            try:
                # Using Google Translator (free web version)
                translated = GoogleTranslator(source='auto', target='ar').translate(text=chunk)
                translated_chunks.append(translated)
                
                # Add a small delay to avoid rate limiting
                time.sleep(2)
                
            except Exception as chunk_error:
                print(f"Error translating chunk {i}: {str(chunk_error)}")
                print("Retrying after 5 seconds...")
                time.sleep(5)
                try:
                    translated = GoogleTranslator(source='auto', target='ar').translate(text=chunk)
                    translated_chunks.append(translated)
                except:
                    print(f"Failed to translate chunk {i}, skipping...")
                    translated_chunks.append(chunk)
            
        # Combine translated chunks
        complete_translation = '\n'.join(translated_chunks)
        
        # Save translated text
        print(f"Saving translation to: {output_file}")
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(complete_translation)
            
        print("Translation completed successfully!")
        print(f"Translated file saved as: {output_file}")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def main():
    while True:
        # Get input from user
        input_file = input("Enter the path to your text file (or 'q' to quit): ")
        
        if input_file.lower() == 'q':
            break
            
        if not os.path.exists(input_file):
            print("File not found. Please check the path and try again.")
            continue
        
        # Generate output filename
        file_name = os.path.splitext(input_file)[0]
        output_file = f"{file_name}_arabic.txt"
        
        # Perform translation
        translate_to_arabic(input_file, output_file)
        
        print("\nWould you like to translate another file?")

if __name__ == "__main__":
    print("Book to Arabic Translator")
    print("------------------------")
    main()
    print("Thank you for using the translator!")