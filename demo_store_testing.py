from bs4 import BeautifulSoup

# Load the HTML file
# r is read mode
with open('demo_store.html', 'r') as f:
    html = f.read()

# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Finding input elements in the URL
# With types 'text' or 'email' or 'tel'
input_elements = soup.find_all('input',{'type':['text','email','tel']})

# Print the number of input elements
# Print the extract attributes
print(len(input_elements))

for input_element in input_elements:
    print(input_element.attrs)


