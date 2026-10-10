# BUG-003: Add to cart / Remove only works on some products for problem_user and error_user

| Field | Value |
| --- | --- |
| Severity | Critical |
| Priority | High |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected accounts | `problem_user`, `error_user` |
| Not affected | `standard_user` |

## Steps to reproduce
1. Log in as `problem_user` / `secret_sauce` (repeat as `error_user`).
2. Click "Add to cart" on all six products, in list order.
3. Check the button labels and the cart badge.
4. Click each button again (the "Remove" ones, then the rest).

## Expected
All six buttons change to "Remove" and the badge shows 6. Clicking them again returns every button to "Add to cart" and clears the badge.

## Actual
- After step 2, only 3 of 6 products switch to "Remove" (the 1st, 2nd and 5th in default order). The other three stay "Add to cart". The badge shows 3.
- After step 4, nothing changes: the badge still shows 3 and the button labels are the same.

Once a product is in the cart it cannot be removed from the inventory page, and three products cannot be added at all.

## Impact
Customers cannot reliably build or edit an order, so the main purchase flow is unusable.

## Notes
Not yet checked: whether Remove works from the cart page itself.
