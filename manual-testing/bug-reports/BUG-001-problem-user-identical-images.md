# BUG-001: All products show the same image for problem_user

| Field | Value |
| --- | --- |
| Severity | Major |
| Priority | High |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected account | `problem_user` |
| Not affected | `standard_user`, `error_user`, `visual_user` |

## Steps to reproduce
1. Go to https://www.saucedemo.com.
2. Log in as `problem_user` / `secret_sauce`.
3. Look at the product images on the inventory page.

## Expected
Each of the six products shows its own image, as for `standard_user` (6 distinct image files).

## Actual
All six products show the same image (1 distinct image source across 6 products).

## Impact
Customers cannot visually tell products apart, which undermines trust and buying decisions.

## Notes
SauceDemo seeds defects into this account deliberately. This report is written as practice.
