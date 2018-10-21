export default {
    cards: [
        'blank',
        'visa',
        'mastercard',
    ],

    cardInputAttributes: [
        'paylike-card-code',
        'paylike-card-number',
        'paylike-card-expiry',
        'paylike-card-expiry-month',
        'paylike-card-expiry-year',
    ],

    /**
     * Paylike card input classes.
     * Used by the Paylike SDK to determine the data content of a given input.
     */
    get cardInputClasses() {
        return this.cardInputAttributes.map(this.getInputClass);
    },

    /**
     * Fetch the Paylike-specific class of a card input attribute.
     *
     * @param cardAttribute
     */
    getInputClass(cardAttribute: string) {
        return cardAttribute.replace('paylike-card', '');
    }
}