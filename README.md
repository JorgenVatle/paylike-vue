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

### [Popup](https://github.com/paylike/sdk#popup-for-a-transaction)
```vue
<script>
    export default {
        // ...
        methods: {
            popup() {
                this.$paylike.popup({
                    currency: 'USD',
                    amount: 1337,                           // use minor units. (1337 is the same as $13.37)
                    title: 'Some Product',
                    description: 'Some descriptive text',
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