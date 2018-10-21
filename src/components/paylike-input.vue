<template>
    <div>
        <input v-on="listeners" :value="value" v-bind="attributes">
    </div>
</template>

<script>
    import Utils from '../utils';

    export default {
        name: 'paylike-input',
        inheritAttrs: false,
        props: ['value', ...Utils.cardInputAttributes],

        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: (event) => {
                        this.$emit('input', event.target.value);
                    }
                }
            },

            attributes() {
                const attrs = {...this.$attrs};

                delete attrs.name;

                return attrs;
            }
        }
    }
</script>