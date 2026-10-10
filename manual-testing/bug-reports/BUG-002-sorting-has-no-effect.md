# BUG-002: Product sorting has no effect for problem_user and error_user

| Field | Value |
| --- | --- |
| Severity | Major |
| Priority | Medium |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected accounts | `problem_user`, `error_user` |
| Not affected | `standard_user` |

## Steps to reproduce
1. Log in as `problem_user` / `secret_sauce` (repeat as `error_user`).
2. Open the sort dropdown and choose "Price (low to high)".
3. Read the prices in display order.
4. Choose "Name (Z to A)" and read the names.

## Expected
- Price: `$7.99, $9.99, $15.99, $15.99, $29.99, $49.99` (what `standard_user` sees).
- Name: Test.allTheThings() T-Shirt (Red) first, Sauce Labs Backpack last.

## Actual
The list does not change. Price sort shows `$29.99, $9.99, $15.99, $49.99, $7.99, $15.99` and name sort shows Sauce Labs Backpack first, Test.allTheThings() T-Shirt (Red) last, which is the default order.

## Impact
Shoppers cannot sort the catalogue, and the control gives no sign that it failed.
