from bs4 import BeautifulSoup

# Load the HTML file
# r is read mode
with open('sample.mhtml', 'r') as f:
    html = f.read()

# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Finding input elements in the URL
input_elements = soup.find_all('input')

# Print the extracted data
print(len(input_elements))

for input_element in input_elements:
    print(input_element.attrs)


