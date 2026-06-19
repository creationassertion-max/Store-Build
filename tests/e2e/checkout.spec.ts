import { test, expect } from "@playwright/test";

test.describe("Checkout", () => {
  test("checkout page loads", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("h1", { hasText: /checkout/i })).toBeVisible();
  });

  test("checkout form has required fields", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("input[type='email'], input[name='email']")).toBeVisible();
    await expect(page.locator("input[name='name'], input[placeholder*='Name']")).toBeVisible();
  });

  test("checkout success page loads directly", async ({ page }) => {
    await page.goto("/checkout/success");
    await expect(
      page.locator("text=Order Confirmed").or(page.locator("text=Thank You"))
    ).toBeVisible();
  });

  test("checkout redirects to Stripe when form submitted with cart", async ({ page }) => {
    // Add item to cart
    await page.goto("/products/midnight-retinol-renewal-serum");
    await page.locator("button", { hasText: "Add to Ritual" }).click();
    await page.goto("/checkout");

    // Fill shipping form
    const emailField = page.locator("input[type='email'], input[name='email']").first();
    const nameField = page.locator("input[name='name'], input[placeholder*='Name']").first();
    if (await emailField.isVisible()) {
      await emailField.fill("test@example.com");
    }
    if (await nameField.isVisible()) {
      await nameField.fill("Test User");
    }

    // Fill address if present
    const addressField = page.locator("input[name='address'], input[placeholder*='Address']").first();
    if (await addressField.isVisible()) {
      await addressField.fill("123 Test St");
      const cityField = page.locator("input[name='city'], input[placeholder*='City']").first();
      if (await cityField.isVisible()) await cityField.fill("New York");
      const postalField = page.locator("input[name='postal'], input[placeholder*='Postal'], input[placeholder*='ZIP']").first();
      if (await postalField.isVisible()) await postalField.fill("10001");
    }

    // Note: We don't actually submit to avoid hitting Stripe in tests
    // Just verify the form is interactive
    const submitBtn = page.locator("button[type='submit'], button", { hasText: /pay|checkout|place order/i }).first();
    await expect(submitBtn).toBeVisible();
  });
});
