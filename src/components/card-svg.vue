<template>
    <div class="paylike-card-icon" v-html=""></div>
</template>

<script>
    import BlankCard from '../assets/card-blank.svg';
    import MasterCard from '../assets/card-mastercard.svg';
    import VisaCard from '../assets/card-visa.svg';

    const availableCards = [
        {
            name: 'visa',
            svg: VisaCard,
        },
        {
            name: 'mastercard',
            svg: MasterCard,
        },
        {
            name: 'blank',
            svg: BlankCard,
        }
    ];

    export default {
        name: 'card-svg',
        props: {
            card: {
                default: 'blank',
                validator(card) {
                    return !!availableCards.find((available) => available.name === card);
                }
            },
        },

        getHtml(cardName) {
            return availableCards.find((card) => {
                return card.name === cardName;
            }).svg;
        }
    }
</script>