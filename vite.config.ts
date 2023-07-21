/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { defineConfig } from "vite";

const localNetwork = "local";
const network = process.env["DFX_NETWORK"] || localNetwork;
const liveInternetIdentity = "https://identity.ic0.app/#authorize";
const internetIdentityUrl =
  network === localNetwork
    ? `http://localhost:4943?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai`
    : liveInternetIdentity;

let canisterIdPath: string;
if (network === localNetwork) {
  // Local replica canister IDs
  canisterIdPath = join(__dirname, ".dfx/local/canister_ids.json");
} else {
  // Custom canister IDs
  canisterIdPath = join(__dirname, "canister_ids.json");
}

if (!existsSync(canisterIdPath)) {
  throw new Error(
    "Unable to find canisters. Running `dfx deploy` should fix this problem."
  );
}
const canisterIds = JSON.parse(readFileSync(canisterIdPath, "utf8"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      DFX_NETWORK: process.env["DFX_NETWORK"],
      NETWORK: network,
      INTERNET_IDENTITY_URL: internetIdentityUrl,
      // Expose canister IDs provided by `dfx deploy`
      ...Object.fromEntries(
        Object.entries(canisterIds).map(([name, ids]) => [
          `${name.toUpperCase()}_CANISTER_ID`,
          ids[network] || ids[localNetwork],
        ])
      ),
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
  },
  server: {
    // Local IC replica proxy
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
      },
    },
  },
});
