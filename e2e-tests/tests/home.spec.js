import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
});


test("Homepage has paragraph text Welcome to the home page!", async ({ page }) => {
    // Locate the paragraph element with the text
    const welcomeText = page.locator('p.text-xl.mt-10.text-center');
    await expect(welcomeText).toHaveText("Welcome to the home page!");
});

test("Header has link with text Home", async ({ page }) => {
    // Locate the link element with the text
    const linkText = page.getByRole("link", { name: "Home" });
    await expect(linkText).toHaveText("Home");
});

test("Header has link with text Communities", async ({ page }) => {
    // Locate the link element with the text
    const linkText = page.getByRole("link", { name: "Communities" });
    await expect(linkText).toHaveText("Communities");
});

test("Clicking Login in the navbar and verifying the form button text", async ({ page }) => {
    // 1. Click the "Login" link in the navbar
    await page.getByRole("link", { name: "Login" }).click();
    // 2. Locate the main button on the form by its role and name (the text it contains).
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    await expect(loginButton).toHaveText("Login");
});


test("Verify the Login page header", async ({ page }) => {
    // Make sure we are on the login page first (via direct navigation or clicking the link)
    await page.goto("http://localhost:5173/auth/login");

    // Locate the main header (h2) by its text content
    const header = page.getByRole('heading', { name: 'Login to Account' });

    // Assert that the header is visible
    await expect(header).toBeVisible();
});

test("Clicking Register in the navbar and verifying the form button text", async ({ page }) => {
    // 1. Click the "Login" link in the navbar
    await page.getByRole("link", { name: "Register" }).click();
    // 2. Locate the main button on the form by its role and name (the text it contains).
    const loginButton = page.getByRole('button', { name: 'Register' });
    await expect(loginButton).toBeVisible();

    await expect(loginButton).toHaveText("Register");
});


test("Verify the Register page header", async ({ page }) => {
    // Make sure we are on the login page first (via direct navigation or clicking the link)
    await page.goto("http://localhost:5173/auth/register");

    // Locate the main header (h2) by its text content
    const header = page.getByRole('heading', { name: 'Create Account' });

    // Assert that the header is visible
    await expect(header).toBeVisible();
});

test("Clicking communities go to communities page which contains header communities", async ({ page }) => {
    await page.getByRole("link", { name: "Communities" }).click();
    const header = page.getByRole('heading', { name: 'Communities' });
    await expect(header).toBeVisible();
});


test("Verify register form to have input for email", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/register");
    await expect(page.getByLabel('email')).toBeVisible();
});
test("Verify register form to have input for password", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/register");
    await expect(page.getByLabel('password')).toBeVisible();
});


test("Verify login form to have input for email", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/login");
    await expect(page.getByLabel('email')).toBeVisible();
});
test("Verify login form to have input for password", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/login");
    await expect(page.getByLabel('password')).toBeVisible();
});
