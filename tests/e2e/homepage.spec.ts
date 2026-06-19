import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=LUMIÈRE")).toBeVisible();
    await expect(page.locator("text=Illuminate")).toBeVisible();
    await expect(page.locator("text=Shop the Collection").first()).toBeVisible();
  });

  test("hero CTA links to /products", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("a[href='/products']").first();
    await expect(cta).toBeVisible();
  });

  test("navigation links are present and correct", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a[href='/products']").first()).toBeVisible();
    await expect(page.locator("a[href='/about']")).toBeVisible();
  });

  test("shows featured products section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Ritual Essentials")).toBeVisible();
  });

  test("shows category banner", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Your Complete Ritual")).toBeVisible();
    await expect(
      page.locator("a[href='/collections/serums-treatments']").first()
    ).toBeVisible();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });
});
