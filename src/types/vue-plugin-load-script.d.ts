import Vue from 'vue';

declare module 'vue-plugin-load-script' {
    function install(vue: Vue): void;
}
declare module 'vue/types/vue' {
    interface Vue {
        loadScript(src: string): Promise<void>;
    }
}
