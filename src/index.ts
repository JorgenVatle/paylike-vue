// @ts-ignore
import LoadScript from 'vue-plugin-load-script';
import { Vue as VueInstance } from "vue/types/vue";

type options = { publicKey: string };
interface Vue extends VueInstance { prototype: any, loadScript?: (src: string) => Promise<void> }

let Vue: Vue;
let Options: options;

const PaylikeVue = {
    /**
     * Vue plugin installer.
     *
     * @param vue
     * @param options
     */
    install(vue: VueInstance, options: options) {
        Vue = vue;
        Options = options;

        if (!options.publicKey) {
            throw this.exception('No public key specified! Use: Vue.use(PaylikeVue, { publicKey: "your-public-key" })');
        }

        this.loadDependencies();
    },

    /**
     * Load Vue plugin dependencies.
     */
    loadDependencies() {
        if (typeof Vue.loadScript === 'undefined') {
            LoadScript.install(Vue);
        }

        Vue.loadScript('https://sdk.paylike.io/3.js')
            .then(() => {
                Vue.prototype.$paylike = Paylike(Options.publicKey);

                this.log('Loaded Paylike SDK.');
            });
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

export default PaylikeVue;