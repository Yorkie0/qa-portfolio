# BUG-004: Last name input goes into the First Name field for problem_user

| Field | Value |
| --- | --- |
| Severity | Major |
| Priority | High |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected account | `problem_user` |
| Not affected | `standard_user` |

## Steps to reproduce
1. Log in as `problem_user` / `secret_sauce`.
2. Add a product that can be added, open the cart, click Checkout.
3. Type `Test` in First Name, `User` in Last Name and `AB1 2CD` in Postal Code.
4. Look at the three fields, then click Continue.

## Expected
First Name = `Test`, Last Name = `User`, Postal Code = `AB1 2CD`. Continue moves to the order overview.

## Actual
First Name shows `User`, Last Name is empty, Postal Code is correct. Continue stays on the form with "Error: Last Name is required".

## Impact
Users cannot complete checkout, and the error points at a field they did fill in.
