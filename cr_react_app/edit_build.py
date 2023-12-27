import os
from bs4 import BeautifulSoup

os.chdir('build')

# Define the file path
file_path = 'index.html'  # Replace with the actual path to your HTML file

# Read the HTML file
with open(file_path, 'r', encoding='utf-8') as file:
    html_contents = file.read()

# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(html_contents, 'html.parser')

# Find all HTML tags with a "src" attribute and replace "src=/" with "src=./"
for link in soup.find_all('link'):
    if 'href' in link.attrs:
        link['href'] = link['href'].replace('href=/', 'href=./')

# Write the modified HTML back to the file
with open(file_path, 'w', encoding='utf-8') as file:
    file.write(str(soup))

print(f'Replacement completed in {file_path}')
