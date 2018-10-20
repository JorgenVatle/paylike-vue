# Paylike Vue
A Vue wrapper for the [Paylike SDK](https://github.com/paylike/sdk). Makes importing and interacting with the Paylike
SDK more seamless and Vue-like.

## Installation
```bash
npm install --save paylike-vue
```

## Import
```js
import PaylikeVue from 'paylike-vue';

Vue.use(PaylikeVue, { publicKey: 'your-paylike-public-key' });
```

## Usage
You can capture transactions and tokenize cards either through [embedding a form](#embed) in a Vue component, or by
calling the [`popup()`](#popup) method on the Vue Paylike prototype exposed by this package.

### Embed

#### [Create a transaction using embed](https://github.com/paylike/sdk#embedded-form-for-transactions)
```vue
<template>
    <paylike-embed :payment="payment" @success="success" @error="error">
        <!-- Do not add `name` properties on your input fields. -->
        <input paylike-input="card-number" placeholder="4100 0000 000 000">
        <input paylike-input="card-expiry" placeholder="MM/YY">
        <input paylike-input="card-code" placeholder="123">
        
        <button type="submit">Pay</button>
    </paylike-embed>
</template>

<script>
    export default {
        data() {
            return {
                payment: {
                    amount: 1337,           // use minor units. (1337 is the same as $13.37)
                    currency: 'USD',
                }
            }
        },
        
        methods: {
            success({ transaction }) {
                console.log(transaction);   // { id: ... }
            },
            
            error(paylikeError) {
                console.error(paylikeError);
            },
        }
    }
</script>
```

#### [Tokenize a card using embed](https://github.com/paylike/sdk#embedded-form-for-tokenization)
```vue
<template>
    <paylike-embed @success="success" @error="error">
        <!-- Do not add `name` properties on your input fields. -->
        <input paylike-input="card-number" placeholder="4100 0000 000 000">
        <input paylike-input="card-expiry" placeholder="MM/YY">
        <input paylike-input="card-code" placeholder="123">
        
        <button type="submit">Save card</button>
    </paylike-embed>
</template>

<script>
    export default {
        methods: {
            success({ card }) {
                console.log(card);   // { id: ... }
            },
            
            error(paylikeError) {
                console.error(paylikeError);
            },
        }
    }
</script>
```

### Popup

#### [Create transaction using popup](https://github.com/paylike/sdk#popup-for-a-transaction)
```js
export default {
    methods: {
        popup() {
            this.$paylike.popup({
                title: 'Some Product',                  // optional
                description: 'Some descriptive text',   // optional
                amount: 1337,                           // use minor units. (1337 is the same as $13.37)
                currency: 'USD',
                custom: {                               // optional
                    someCustomProperty: 'custom-value'
                }
            }, this.popupCallback)
        },
        
        popupCallback(error, response) {
            if (error) {
                return console.error(error);
            }
            
            console.log(response)                       // { transaction: { id: ... } }
        }
    }
}
```

#### [Tokenize card using popup](https://github.com/paylike/sdk#popup-to-save-tokenize-a-card-for-later-use)
```js
export default {
    methods: {
        popup() {
            this.$paylike.popup({
                title: 'Add card',
                description: 'Please enter your card details',
            }, this.popupCallback);
        },
        
        popupCallback(error, response) {
            if (error) {
                return console.error(error);
            }
            
            console.log(response) // { card: { id: ... } }
        }
    }
}
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle