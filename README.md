# Checkout page recommendation

Objective of this project is to create a script that analyses HTML forms in standard eCommerce checkout pages and to provide corrosponding recommendations based on the results of analysis.
The script should be able to:
1. Count the number of form fields in the checkout page(s)
    1. <idea 1 >Get number of input
2. Identify default value of "billing address" field
    1. <idea 1 >billing address = shipping address
    1. <idea 2 >Check for checkbox
3. Identify if browser autofill is enabled in the form fields
4. Identify if inline validation of error is applied to the form fields
5. Provide relevant recommendations based on the outcomes of no.1-4 mentioned above


Apr 27
Problems when trying to extract input element:
Some eCom website uses ´checkout-app.js´ for checkout, the codes are hidden in the html file (e.g. new era website)
