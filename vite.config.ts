import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

const localNetwork = 'local';
const network = process.env['DFX_NETWORK'] || localNetwork;

const internetIdentityUrl =
  network === "local"
    ? `http://localhost:4943?canisterId=be2us-64aaa-aaaaa-qaabq-cai`
    : "https://identity.ic0.app/#authorize";

let canisterIdPath: string;
if (network === localNetwork) {
  // Local replica canister IDs
  canisterIdPath = join(__dirname, '.dfx/local/canister_ids.json');
} else {
  // Custom canister IDs
  canisterIdPath = join(__dirname, 'canister_ids.json');
}

if (!existsSync(canisterIdPath)) {
  throw new Error(
    'Unable to find canisters. Running `dfx deploy` should fix this problem.',
  );
}
const canisterIds = JSON.parse(readFileSync(canisterIdPath, 'utf8'));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      DFX_NETWORK: process.env['DFX_NETWORK'],
      INTERNET_IDENTITY_URL: internetIdentityUrl,
      // Expose canister IDs provided by `dfx deploy`
      ...Object.fromEntries(
        Object.entries(canisterIds).map(([name, ids]) => [
          `${name.toUpperCase()}_CANISTER_ID`,
          ids[network] || ids[localNetwork],
        ]),
      ),

    },
  },

  // define: {
  //   // global: 'globalThis',

  //   'process.env.DFX_NETWORK': JSON.stringify(process.env.DFX_NETWORK),
  //   'process.env.INTERNET_IDENTITY_URL': JSON.stringify(internetIdentityUrl),
  //   // Expose canister IDs provided by `dfx deploy`
  //   ...Object.fromEntries(
  //     Object.entries(canisterIds).map(([name, ids]) => [
  //       `process.env.${name.toUpperCase()}_CANISTER_ID`,
  //       JSON.stringify(ids[network] || ids[localNetwork]),
  //     ]),
  //   ),
  // },

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // @ts-ignore
        NodeModulesPolyfillPlugin(),
        {
          name: 'fix-node-globals-polyfill',
          setup(build) {
            build.onResolve({ filter: /_virtual-process-polyfill_\.js/ }, ({ path }) => ({ path }));
          }
        }
      ]
    }
  },

  server: {
    // Local IC replica proxy
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
      },
    },
  },
});
