# BUG-006: Prices differ from baseline and price sort is wrong for visual_user

| Field | Value |
| --- | --- |
| Severity | Critical |
| Priority | High |
| Status | Open |
| Found | 2026-10-10 |
| Environment | Windows 11, Chromium 156 (Playwright), https://www.saucedemo.com |
| Affected account | `visual_user` |
| Not affected | `standard_user` |

## Steps to reproduce
1. Log in as `visual_user` / `secret_sauce`.
2. Choose "Price (low to high)" and read the prices in display order.
3. Compare with the same steps as `standard_user`.

## Expected
`$7.99, $9.99, $15.99, $15.99, $29.99, $49.99`, ascending.

## Actual
`$72.15, $52.7, $41.24, $49.13, $10.65, $72.99`. These are not the catalogue prices, are not in ascending order, and `$52.7` is formatted with one decimal place.

## Impact
Customers see wrong prices, which is a trust and potentially legal problem for a shop.

## Notes
- Name sort (Z to A) matched the baseline for this account.
- Add/remove cart and the checkout form behaved like the baseline for this account.
- Layout and styling differences have not been examined yet, so no claims are made about them.
