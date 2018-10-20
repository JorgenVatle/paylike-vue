import LoadScript from 'vue-plugin-load-script';
import { Vue as VueInstance } from "vue/types/vue";

type options = { publicKey: string };
interface Vue extends VueInstance { loadScript?: (Vue: VueInstance) => void }

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

        this.loadDependencies();
    },

    /**
     * Load Vue plugin dependencies.
     */
    loadDependencies() {
        if (typeof Vue.loadScript === 'undefined') {
            LoadScript.install(Vue);
        }
    }
};

export default PaylikeVue;