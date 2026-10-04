/* eslint-disable @typescript-eslint/no-empty-function */
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src")
    }
  },
  plugins: [
    react(),
    babel({
      plugins: [
        ["babel-plugin-styled-components", { displayName: mode !== "production", pure: true }]
      ]
    }),
    dts({
      bundleTypes: true,
      tsconfigPath: "./tsconfig.json"
    }),
    svgr(),
    visualizer({
      template: "treemap"
    })
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "react-scheduler",
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime"
        }
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
}));
