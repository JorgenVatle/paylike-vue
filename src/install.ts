import LoadScript from 'vue-plugin-load-script';
import { Vue as VueInstance } from 'vue/types/vue';

import PaylikeEmbed from './components/paylike-embed.vue';

let Vue: Vue;
let Options: options;
let loaded = false;

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
        Vue.component('PaylikeEmbed', PaylikeEmbed);
        Vue.prototype.$paylikeVue = {
            load: () => loadSdk(),
        }
        
        if (!options || !options.publicKey) {
            throw this.exception('No public key specified! Use: Vue.use(PaylikeVue, { publicKey: "your-public-key" })');
        }
        
        if (options.loadSdkImmediately === false) {
            return;
        }
        
        Vue.$paylikeVue.load().then(() => {
            this.log('Loaded Paylike SDK.');
        }).catch((error) => {
            console.error('Failed to load Paylike SDK!', error);
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
    },
};

async function loadSdk() {
    if (typeof window === 'undefined') {
        return;
    }
    if (loaded) {
        throw new Error('Paylike SDK has already been loaded!');
    }
    if (typeof Vue.loadScript === 'undefined') {
        LoadScript.install(Vue);
    }
    
    await Vue.loadScript!('https://sdk.paylike.io/3.js');
    window.Paylike(Options.publicKey);
    loaded = true;
}

type options = {
    publicKey: string
    loadSdkImmediately?: boolean;
};

interface Vue extends VueInstance {
    prototype: any,
    loadScript?: (src: string) => Promise<void>,
    component: (name: string, component: any) => void;
}

declare module 'vue-plugin-load-script' {
    function install(vue: Vue): void;
}

declare module 'vue/types/vue' {
    interface Vue {
        $paylikeVue: {
            load(): Promise<void>;
        }
    }
}