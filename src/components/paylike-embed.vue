<template>
    <form ref="form" @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'paylike-embed',
        props: ['payment'],

        methods: {
            /**
             * Handle Paylike form submit.
             */
            submit() {
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
            }
        }
    }
</script>