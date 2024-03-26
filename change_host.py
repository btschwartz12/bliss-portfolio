import os
import sys

def replace_in_file(file_path, target_string, replacement_string):
    # Read in the file
    with open(file_path, 'r', encoding='utf-8') as file:
        file_contents = file.read()

    # Replace the target string with the replacement string
    file_contents = file_contents.replace(target_string, replacement_string)

    # Write the file out again
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(file_contents)

def replace_in_directory(directory, target_string, replacement_string):
    for dirpath, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            replace_in_file(file_path, target_string, replacement_string)

# Example usage
directory_path = sys.argv[1]
target_string = sys.argv[2]
replacement_string = sys.argv[3]
replace_in_directory(directory_path, target_string, replacement_string)
