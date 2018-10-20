<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'paylike-embed',

        methods: {
            submit() {
                // Handle form submit.
            }
        }
    }
</script>