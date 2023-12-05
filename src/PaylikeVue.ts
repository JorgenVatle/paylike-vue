import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';
import { PaylikeInstance, PopupOptions } from './types/PaylikeSdk';

export interface Config {
    publicKey: string;
}

export class PaylikeVue {
    protected loaded = false;
    protected client?: PaylikeInstance;
    
    constructor(
        protected readonly vue: Vue,
        protected readonly config: Config
    ) {
    }
    
    public async loadSdk() {
        if (typeof window === 'undefined') {
            return;
        }
        if (this.loaded) {
            throw new PaylikeVueError('Paylike SDK has already been loaded!');
        }
        if (!this.config.publicKey) {
            throw new PaylikeVueError(
                'No public key specified! Use: Vue.use(PaylikeVue, { publicKey: "your-public-key" })');
        }
        if (typeof this.vue.loadScript === 'undefined') {
            LoadScript.install(this.vue);
        }
        
        await this.vue.loadScript!('https://sdk.paylike.io/3.js');
        this.log('Loaded Paylike SDK.');
        this.client = window.Paylike(this.config.publicKey);
        this.loaded = true;
    }
    
    public popup(options: PopupOptions, callback: (error: Error, response: unknown) => void) {
        return this.client!.popup(options, callback);
    }
    
    protected log(message: string) {
        console.info(`[PaylikeVue] ${message}`);
    }
}

class PaylikeVueError extends Error {
}

