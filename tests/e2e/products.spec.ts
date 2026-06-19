import { test, expect } from "@playwright/test";

test.describe("Product Catalog", () => {
  test("products page loads", async ({ page }) => {
    await page.goto("/products");
    await expect(
      page.locator("h1", { hasText: "All Products" })
    ).toBeVisible();
  });

  test("shows product cards", async ({ page }) => {
    await page.goto("/products");
    const cards = page.locator("a[href^='/products/']");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filter sidebar is present", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("text=Filter")).toBeVisible();
    await expect(page.locator("text=All Products")).toBeVisible();
  });

  test("category filter works", async ({ page }) => {
    await page.goto("/products");
    const serumFilter = page.locator("button", {
      hasText: "Serums & Treatments",
    });
    await serumFilter.click();
    await page.waitForURL(/category=serums-treatments/);
    await expect(page.locator("h1")).toContainText("Serums");
  });

  test("product detail page loads", async ({ page }) => {
    await page.goto("/products");
    const firstProduct = page.locator("a[href^='/products/']").first();
    const href = await firstProduct.getAttribute("href");
    if (href) {
      await page.goto(href);
      await expect(page.locator("button", { hasText: "Add to Ritual" })).toBeVisible();
      await expect(page.locator("text=$")).toBeVisible();
    }
  });

  test("product detail has story accordion", async ({ page }) => {
    await page.goto("/products/eclat-vitamin-c-brightening-serum");
    const accordion = page.locator(
      "text=The Story Behind This Formula"
    );
    await expect(accordion).toBeVisible();
    await accordion.click();
  });

  test("collections page loads", async ({ page }) => {
    await page.goto("/collections/serums-treatments");
    await expect(
      page.locator("h1", { hasText: "Serums & Treatments" })
    ).toBeVisible();
  });
});
