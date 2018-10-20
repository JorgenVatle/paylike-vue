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
                this.createTransaction();
            },

            /**
             * Create Paylike transaction.
             */
            createTransaction() {
                this.$paylike.pay(this.$refs.form, this.payment, this.callbackHandler)
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