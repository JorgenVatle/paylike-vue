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
    install(vue: Vue, options: Config & { loadSdkImmediately?: boolean }) {
        Vue.component('PaylikeEmbed', PaylikeEmbed);
        Vue.prototype.$paylike = new PaylikeVue(vue, options);
        
        if (options.loadSdkImmediately === false) {
            return;
        }
        
        vue.$paylike.loadSdk().catch((error) => {
            console.error('Failed to load Paylike SDK!', error);
        });
    },
    
};

declare module 'vue/types/vue' {
    interface Vue {
        $paylike: PaylikeVue;
    }
}
