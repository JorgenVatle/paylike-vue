// @ts-ignore
import LoadScript from 'vue-plugin-load-script';
import { Vue as VueInstance } from "vue/types/vue";

import PaylikeEmbed from './components/paylike-embed.vue';

type options = { publicKey: string };
interface Vue extends VueInstance {
    prototype: any,
    loadScript?: (src: string) => Promise<void>,
    component: (name: string, component: any) => void;
}

let Vue: Vue;
let Options: options;

export default {

    /**
     * Vue plugin installer.
     *
     * @param vue
     * @param options
     */
    install(vue: Vue, options: options) {
        Vue = vue;
        Options = options;

        if (!options || !options.publicKey) {
            throw this.exception('No public key specified! Use: Vue.use(PaylikeVue, { publicKey: "your-public-key" })');
        }

        this.loadDependencies().then(() => {
            this.log('Loaded Paylike SDK.');
        }).catch((error) => {
            console.error('Failed to load Paylike SDK!', error);
        });

        Vue.component('PaylikeEmbed', PaylikeEmbed);
    },

    /**
     * Load Vue plugin dependencies.
     */
    async loadDependencies() {
        if (typeof window === 'undefined') {
            return;
        }
        if (typeof Vue.loadScript === 'undefined') {
            LoadScript.install(Vue);
        }

        await Vue.loadScript('https://sdk.paylike.io/3.js');
        window.Paylike(Options.publicKey);
    },

    /**
     * Log an error to the console.
     *
     * @param message
     */
    exception(message: string) {
        return new Error(`[PaylikeVue] ${message}`);
    },

    /**
     * Log a message to the console.
     *
     * @param message
     */
    log(message: string) {
        console.info(`[PaylikeVue] ${message}`);
    }
};