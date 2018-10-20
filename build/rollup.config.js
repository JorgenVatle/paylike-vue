import Vue from 'rollup-plugin-vue';
import Buble from 'rollup-plugin-buble';
import Typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        name: 'PaylikeVue',
        exports: 'named',
    },
    plugins: [
        Typescript(),
        Vue({ compileTemplate: true }),
        Buble(),
    ],
};