# BUG-005: Last name is discarded but checkout continues for error_user

| Field | Value |
| --- | --- |
| Severity | Major |
| Priority | High |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected account | `error_user` |
| Not affected | `standard_user` |

## Steps to reproduce
1. Log in as `error_user` / `secret_sauce`.
2. Add a product that can be added, open the cart, click Checkout.
3. Type `Test` in First Name, `User` in Last Name and `AB1 2CD` in Postal Code.
4. Look at the Last Name field, then click Continue.

## Expected
Last Name holds `User`. Continue moves to the order overview with the details entered.

## Actual
Last Name is empty after typing. Continue still moves to `checkout-step-two.html` with no validation error, even though a required field is blank.

## Impact
An order can proceed without a last name, and the user gets no hint their input was lost.

## Notes
Compare BUG-004: here the validation is skipped, whereas for `problem_user` it fires.
