import Vue from 'rollup-plugin-vue';
import Buble from 'rollup-plugin-buble';
import SVG from 'rollup-plugin-vue-inline-svg';
import Typescript from 'rollup-plugin-typescript';

const output = {
    name: 'PaylikeVue',
    exports: 'named',
    file: 'dist/paylike-vue',
};

export default {
    input: 'src/index.ts',
    output: [
        {...output, format: 'umd',  file: output.file + '.umd.js'},
        {...output, format: 'es',   file: output.file + '.esm.js'},
        {...output, format: 'iife', file: output.file + '.min.js'},
    ],
    plugins: [
        Typescript(),
        SVG(),
        Vue({ compileTemplate: true, css: true }),
        Buble(),
    ],
};