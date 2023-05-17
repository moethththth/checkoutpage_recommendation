#!/usr/bin/env python
# coding: utf-8

# # Checking if browser autofill function is enabled in a form field

# The objective of this project is to check if the browser autofill function is disabled in a HTML form field and to provide recommendation to enable the browser autofill function for a specific form field.

# __Description:__
# 
# 
# For `input element` in a HTML form, `autcomplete` attribute determines whether the website has enabled browser autofill function in a specific field. There are mainly two types of value of the `autocomplete` attribute:
# 
# - If browser autofill for an input element is disabled, `autocomplete = "off"`
# - If browser autofill for an input element is enabled, `autocomplete = (matching value in browser setting)` [See a list of autcomplete values here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
# 
# 
# In some cases, when `autocomplete = "on"`, the browser will use its own judgement to decide what data is expected in the field. However, this is not a very common case and will not be taken into account in this project.

# In[11]:


from bs4 import BeautifulSoup


# In[12]:


with open('drinks&co.html', mode='r', encoding='utf-8') as f:
    html = f.read()


# In[13]:


# Parse the HTML using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')


# In[14]:


# Finding input elements in the URL
# Only include types that will require user input
input_elements = soup.find_all('input', {'type': ['text', 'email', 'tel', 'date', 'datetime-local', 'number', 'month', 'time']})


# In[20]:


# Create a list of attribute for each input element
inputs_list = []
for input_element in input_elements:
    inputs_list.append(input_element.attrs)


# In[21]:


import pandas as pd
df = pd.DataFrame(inputs_list)
df


# ## Step 1: Extracting elements that have disabled autofill function

# In[16]:


# Add the autocomplete == off elements to a list
auto_off = []
for input_element in input_elements:
  if input_element['autocomplete'] == 'off':
    auto_off.append(input_element['name'])


# In[22]:


auto_off


# ## Step 2: Creating regular expressions to include possible names for the common fields

# Since we would like to recommend to enable the autofill function only for specific fields, step 2 is for us to find all possible field names for the common fields.

# In[17]:


# Regex for autocomplete fields
# Testing regex for autocomplete fields
import re
p_name= re.compile('name',re.IGNORECASE)
p_address = re.compile('address',re.IGNORECASE)
p_postcode = re.compile('post',re.IGNORECASE)
p_city = re.compile('city',re.IGNORECASE)


# In[18]:


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

