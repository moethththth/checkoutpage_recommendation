# Checkout page recommendation

Objective of this project is to create a script that analyses HTML forms in standard eCommerce checkout pages and to provide corrosponding recommendations based on the results of analysis.
The script should be able to:
1. Count the number of form fields in the checkout page(s)
    1. Count the inputs by using beautiful
    1. Try this for 4 different websites and try to reduce the special cases.
2. Identify default value of "billing address" field
    1. <idea 1 >billing address = shipping address
    1. <idea 2 >Check for checkbox
3. Identify if browser autofill is enabled in the form fields
4. Identify if inline validation of error is applied to the form fields
5. Provide relevant recommendations based on the outcomes of no.1-4 mentioned above
