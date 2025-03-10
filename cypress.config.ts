import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1080,
    viewportHeight: 1920,
  },
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});
