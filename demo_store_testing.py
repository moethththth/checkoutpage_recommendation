from bs4 import BeautifulSoup

# Load the HTML file
# r is read mode
with open('drinks&co.html', 'r') as f:
    html = f.read()

# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Finding input elements in the URL
# Only include types that will require user input
input_elements = soup.find_all('input', {'type': ['text', 'email', 'tel', 'date', 'datetime-local', 'number', 'month', 'time']})



