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

print('Issue #2')

# Print the number of input elements
num_input = len(input_elements)
print(num_input)

# Print recommendations
if num_input > 8:
  print('The recommended number of form fields should be 8. \nTry to reduce the number of form fields.')

