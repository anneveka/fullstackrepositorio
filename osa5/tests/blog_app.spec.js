const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http://localhost:3003/api/testing/reset");
        await request.post("http://localhost:3003/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
        });

        await page.goto("http://localhost:5173");
    });

    test("Login form is shown", async ({ page }) => {
        await expect(page.getByText("Log in to application")).toBeVisible();
        await expect(page.getByText("username")).toBeVisible();
        await expect(page.getByText("password")).toBeVisible();
    });

    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen");
            await expect(
                page.getByText("Matti Luukkainen logged in"),
            ).toBeVisible();
        });

        test("fails with wrong credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "eioikee");

            await expect(
                page.getByText("wrong username or password"),
            ).toBeVisible();
            await expect(
                page.getByText("Matti Luukkainen logged in"),
            ).not.toBeVisible();
        });
    });

    describe("When logged in", () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen");
        });

        test("a new blog can be created", async ({ page }) => {
            await createBlog(
                page,
                "Reaktin alkeet",
                "Matti Meikäläinen",
                "https://react",
            );
            await expect(
                page.getByText(
                    "a new blog Reaktin alkeet by Matti Meikäläinen added",
                ),
            ).toBeVisible();
        });

        test("Blog can be liked", async ({ page }) => {
            await createBlog(
                page,
                "Reaktin perusteet",
                "Matti Meikäläinen",
                "https://react1",
            );

            const blogElement = page
                .getByText("Reaktin perusteet")
                .locator("..");
            await page.getByRole("button", { name: "view" }).first().click();

            await page.getByRole("button", { name: "like" }).click();
            await expect(page.getByText("likes 1")).toBeVisible();
        });

        test("Button for deleting blog is visible", async ({ page }) => {
            await createBlog(
                page,
                "Testien perusteet",
                "Pekka",
                "https://testi",
            );
            await page.getByRole("button", { name: "view" }).first().click();
            await expect(page.getByText("remove")).toBeVisible();
        });

        test("Blog can be removed by its creator", async ({ page }) => {
            await createBlog(page, "E2E testit", "Mluukkainen", "https://e2e");
            await page.getByRole("button", { name: "view" }).click();

            page.on("dialog", (dialog) => dialog.accept());

            await page.getByRole("button", { name: "remove" }).click();

            await expect(page.getByText("E2E testit Mluukkainen")).toHaveCount(
                0,
            );
        });
    });
});
