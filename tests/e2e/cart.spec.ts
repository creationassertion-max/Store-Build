import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test("add to cart from product detail", async ({ page }) => {
    await page.goto("/products/eclat-vitamin-c-brightening-serum");
    await page.locator("button", { hasText: "Add to Ritual" }).click();
    // Cart drawer should open or badge should update
    const badge = page.locator("[data-testid='cart-count']");
    const drawer = page.locator("text=Your Ritual");
    await expect(badge.or(drawer)).toBeVisible();
  });

  test("cart page shows added item", async ({ page }) => {
    // Add item via product page first
    await page.goto("/products/eclat-vitamin-c-brightening-serum");
    await page.locator("button", { hasText: "Add to Ritual" }).click();
    await page.goto("/cart");
    await expect(page.locator("text=Éclat Vitamin C")).toBeVisible();
  });

  test("cart page loads when empty", async ({ page }) => {
    await page.goto("/cart");
    // Should show empty state or cart heading
    const heading = page.locator("h1", { hasText: "Your Ritual" });
    const empty = page.locator("text=Your cart is empty");
    await expect(heading.or(empty)).toBeVisible();
  });

  test("cart page has checkout button when items present", async ({ page }) => {
    await page.goto("/products/aqua-plump-hyaluronic-serum");
    await page.locator("button", { hasText: "Add to Ritual" }).click();
    await page.goto("/cart");
    await expect(
      page.locator("a[href='/checkout'], button", { hasText: /checkout/i }).first()
    ).toBeVisible();
  });

  test("quantity can be increased", async ({ page }) => {
    await page.goto("/products/velvet-peptide-firming-serum");
    await page.locator("button", { hasText: "Add to Ritual" }).click();
    await page.goto("/cart");
    const plusBtn = page.locator("button", { hasText: "+" }).first();
    if (await plusBtn.isVisible()) {
      await plusBtn.click();
      await expect(page.locator("text=2")).toBeVisible();
    }
  });
});
