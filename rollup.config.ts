import { defineConfig, Plugin } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import { basename } from "path";
import { writeFileSync, mkdirSync } from "fs";

const pluginName = basename(process.cwd());

// Ensure dist folder exists
try {
  mkdirSync('dist');
} catch (err) {
  if (err.code !== 'EEXIST') {
    throw err;
  }
}

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: `dist/${pluginName}.js`,
      format: "cjs",
      strict: false
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    esbuild({ minify: true, target: "ES2019" }),
    createPluginJson(),
  ]
});

function createPluginJson(options = {}): Plugin {
  return {
    name: 'plugin-info',
    writeBundle: (err) => {
      const info = require('./package.json');
      const data = {
        "name": pluginName,
        "description": info?.description ?? "No description was provided.",
        "author": info?.author?.name ?? "Unknown",
        "version": info?.version ?? "1.0.0"
      };

      writeFileSync(`dist/${pluginName}.json`, JSON.stringify(data, null, "\t"));
    }
  }
};
