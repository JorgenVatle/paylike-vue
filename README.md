# Paylike Vue
A Vue wrapper for the [Paylike SDK](https://github.com/paylike/sdk).

## Installation
```bash
npm install --save paylike-vue
```

## Import
```js
import PaylikeVue from 'paylike-vue';

Vue.use(PaylikeVue);
```

## Usage

### [Embed](https://github.com/paylike/sdk#embedded-form-for-transactions)
```vue
<template>
    <paylike-embed :payment="payment" @success="success" @error="error">
        <!-- Do not add `name` properties on your input fields. -->
        <input paylike-type="card-number" placeholder="4100 0000 000 000">
        <input paylike-type="card-expiry" placeholder="MM/YY">
        <input paylike-type="card-code" placeholder="123">
        
        <button type="submit">Pay</button>
    </paylike-embed>
</template>

<script>
    export default {
        data() {
            return {
                payment: {
                    amount: 1337,       // use minor units. (1337 is the same as $13.37)
                    currency: 'USD',
                }
            }
        },
        
        methods: {
            success({ transaction }) {
                console.log(transaction); // { id: ... }
            },
            
            error(paylikeError) {
                console.error(paylikeError);
            },
        }
    }
</script>
```

### [Popup](https://github.com/paylike/sdk#popup-for-a-transaction)
```vue
<script>
    export default {
        // ...
        methods: {
            popup() {
                this.$paylike.popup({
                    title: 'Some Product',
                    description: 'Some descriptive text',

                    amount: 1337,                           // use minor units. (1337 is the same as $13.37)
                    currency: 'USD',
                    
                    custom: {                               // optional
                        someCustomProperty: 'custom-value'
                    }
                })
            }
        }
        // ...
    }
</script>
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle