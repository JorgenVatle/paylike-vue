<template>
    <form ref="form" @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
    import Utils from '../utils';

    const fieldClasses = Utils.cardInputAttributes.map((attribute) => {
        return attribute.replace('paylike-card', '');
    });

    export default {
        name: 'paylike-embed',
        props: ['payment'],

        methods: {
            /**
             * Handle Paylike form submit.
             */
            submit() {
                this.prepareForm();

                if (!this.payment) {
                    return this.tokenizeCard();
                }

                this.createTransaction();
            },

            /**
             * Create Paylike transaction.
             */
            createTransaction() {
                this.$paylike.pay(this.$refs.form, this.payment, this.callbackHandler)
            },

            /**
             * Tokenize a card for later use.
             */
            tokenizeCard() {
                this.$paylike.tokenize(this.$refs.form, {}, this.callbackHandler);
            },

            /**
             * Handle a Paylike callback.
             *
             * @param err
             * @param resp
             * @returns {default.methods}
             */
            callbackHandler(err, resp) {
                if (err) {
                    return this.$emit('error', err);
                }

                this.$emit('success', resp);
            },

            /**
             * Prepare an input for Paylike payment.
             *
             * @param {HTMLInputElement} input
             */
            prepareInput(input) {
                input.removeAttribute('name');

                Utils.cardInputAttributes.forEach((attribute) => {
                    if (input.getAttribute(attribute) !== null) {
                        input.classList.add(Utils.getInputClass(attribute));
                    }
                });
            },

            /**
             * Remove name attributes from form.
             */
            prepareForm() {
                this.$refs.form.querySelectorAll('input').forEach(this.prepareInput);
            },
        }
    }
</script>