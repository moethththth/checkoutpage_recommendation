const disableContinueButton = () => {
    const continueButton = document.getElementById('continue_button');
    if (continueButton) {
        continueButton.classList.add('btn--disabled');
        continueButton.disabled = true;
    }

}

const showShippingError = (message, content) => {
    // Prevent customers from continuing with checkout
    disableContinueButton();

    // Wrap error content in styled div
    errorContent = `
        <div role="alert" data-shipping-warning="" data-banner="true" class="notice notice--error default-background" tabindex="-1" aria-atomic="true" aria-live="polite">
            <svg class="icon-svg icon-svg--size-24 notice__icon" aria-hidden="true" focusable="false">
                <use xlink:href="#error"></use>
            </svg>
            <div class="notice__content">
                <p class="notice__text">
                    ${message}
                </p>
                ${content ? content : ''}
            </div>
        </div>
    `;

    // Replace the shipping selection menu with the error message
    const shippingSection = document.querySelector('.section.section--shipping-method');
    if (shippingSection) {
        shippingSection.innerHTML = errorContent;
    }
}

// Wrap product data in styled div
const lineItemInfo = (lineItem) => {
    return `
        <p class="notice__text">
            <span class="product__description__name order-summary__emphasis">${lineItem.productTitle}</span>
            ${ lineItem.variantTitle !== 'Default Title' ? `<span class="product__description__variant order-summary__small-text">${lineItem.variantTitle}</span>` : ''}
        </p>
    `;
}

document.addEventListener('page:load', function() {

    // Ensure the shipping step is active
    if(Shopify.Checkout.step !== 'shipping_method')
        return;

    // #checkout-availability-info uses data attributes to pass inventory info into this function
    const availabilityInfoElement = document.getElementById('checkout-availability-info');
    if (!availabilityInfoElement) {
        console.log('#availabilityInfoElement not found. Ensure it\'s included in checkout.liquid');
        return;
    }

    let errorContent = '';

    // Extract inventory info from #checkout-availability-info data attributes
    const translations = JSON.parse(availabilityInfoElement.dataset.translations);
    const lineItemInventory = JSON.parse(availabilityInfoElement.dataset.lineItemInventory);
    const inventoryLocationProvinces = JSON.parse(availabilityInfoElement.dataset.inventoryLocationProvinces);
    const provinceCode = availabilityInfoElement.dataset.provinceCode;
    const prefixedProvinceCode = `province_${provinceCode}`;
    const inventoryLocationStores = inventoryLocationProvinces[prefixedProvinceCode];

    // If product information is present within errorContent, display an error message and prevent checkout
    if (errorContent !== '') {
        showShippingError(translations.errorInvalidProductLocations, errorContent);
    }
});
