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

print('Issue #4')
print ('\n')

# Add the autocomplete == off elements to a list
auto_off = []
for input_element in input_elements:
  if input_element['autocomplete'] == 'off':
    auto_off.append(input_element['name'])

# Regex for autocomplete fields
# Testing regex for autocomplete fields
import re
p_name= re.compile('name',re.IGNORECASE)
p_address = re.compile('address',re.IGNORECASE)
p_postcode = re.compile('post',re.IGNORECASE)
p_city = re.compile('city',re.IGNORECASE)

# Only showing reco for certain fields
reco_text = 'Please enable browser autofill for {field}'
for name in auto_off:
  testing_text = name
  if p_name.findall(testing_text):
    print(reco_text.format(field= testing_text))
  elif p_address.findall(testing_text):
    print(reco_text.format(field= testing_text))
  elif p_postcode.findall(testing_text):
    print(reco_text.format(field= testing_text))
  elif p_city.findall(testing_text):
    print(reco_text.format(field= testing_text))


