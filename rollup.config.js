import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/ts/index.ts",
    output: [
        {
            format: "es",
            dir: "public/client",
            sourcemap: true,
            strict: true
        }
    ],

    plugins: [
        typescript(),
        terser()
    ]
}