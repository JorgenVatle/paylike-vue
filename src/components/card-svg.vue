<template>
    <div class="paylike-card-icon">
        <visa-card v-if="isCard('visa')" />
        <master-card v-else-if="isCard('mastercard')" />
        <blank-card v-else />
    </div>
</template>

<script>
    import BlankCard from '../assets/card-blank.svg';
    import MasterCard from '../assets/card-mastercard.svg';
    import VisaCard from '../assets/card-visa.svg';
    import Utils from '../utils';

    export default {
        name: 'card-svg',
        components: { BlankCard, MasterCard, VisaCard },
        props: {
            card: {
                default: 'blank',
                validator(card) {
                    return Utils.cards.indexOf(card) !== -1;
                }
            },
        },

        methods: {
            /**
             * Check if the given card is to be displayed.
             *
             * @param card
             * @returns {boolean}
             */
            isCard(card) {
                return this.card === card;
            }
        }
    }
</script>