import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    reporter: "list",
    use: {
        baseURL: "http://localhost:5174",
        trace: "off",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});