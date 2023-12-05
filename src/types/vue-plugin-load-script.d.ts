import Vue from 'vue';

declare module 'vue-plugin-load-script' {
    function install(vue: typeof Vue): void;
}
declare module 'vue/types/vue' {
    interface VueConstructor {
        loadScript(src: string): Promise<void>;
    }
}
