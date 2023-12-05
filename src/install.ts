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
        Vue.prototype.$paylikeVue = new PaylikeVue(options);
        
        if (options.loadSdkImmediately === false) {
            return;
        }
        
        Vue.$paylikeVue.loadSdk().catch((error) => {
            console.error('Failed to load Paylike SDK!', error);
        });
    },
    
};

class PaylikeVue {
    constructor(protected readonly config: { publicKey: string }) {}
    
    public async loadSdk() {
        if (typeof window === 'undefined') {
            return;
        }
        if (loaded) {
            throw new PaylikeVueError('Paylike SDK has already been loaded!');
        }
        if (!this.config.publicKey) {
            throw new PaylikeVueError('No public key specified! Use: Vue.use(PaylikeVue, { publicKey: "your-public-key" })')
        }
        if (typeof Vue.loadScript === 'undefined') {
            LoadScript.install(Vue);
        }
        
        await Vue.loadScript!('https://sdk.paylike.io/3.js');
        this.log('Loaded Paylike SDK.');
        window.Paylike(Options.publicKey);
        loaded = true;
    }
    
    protected log(message: string) {
        console.info(`[PaylikeVue] ${message}`);
    }
}

class PaylikeVueError extends Error {}

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
        $paylikeVue: PaylikeVue;
    }
}