import Vue from 'vue';
import PaylikeEmbed from './components/paylike-embed.vue';
import { Config, PaylikeVue } from './PaylikeVue';


export default {
    /**
     * Vue plugin installer.
     *
     * @param vue
     * @param options
     */
    install(vue: typeof Vue, options: Config & { loadSdkImmediately?: boolean }) {
        vue.component('PaylikeEmbed', PaylikeEmbed);
        vue.prototype.$paylike = new PaylikeVue(vue, options);
        
        if (options.loadSdkImmediately === false) {
            return;
        }
        
        vue.prototype.$paylike.loadSdk().catch((error: unknown) => {
            console.error('Failed to load Paylike SDK!', error);
        });
    },
    
};


declare module 'vue/types/vue' {
    interface Vue {
        $paylike: PaylikeVue;
    }
}
