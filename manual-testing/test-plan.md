# Test Plan: SauceDemo

**Application under test:** https://www.saucedemo.com (Sauce Labs demo e-commerce site)
**Author:** Iain York
**Date:** 2026-10-10
**Status:** Draft v1

> SauceDemo is a public practice site. Several of its user accounts contain deliberately seeded defects, which makes it a safe target for demonstrating exploratory testing and defect reporting. Nothing here relates to any employer's product.

## 1. Objective

Verify that the core shopping journey (login, browse, add to cart, checkout) works correctly for each supported user type, and document any defects found.

## 2. Scope

**In scope**
- Login and error handling
- Product listing: images, names, prices, sorting
- Cart: add, remove, badge count
- Checkout: information form, validation, order overview, completion
- Behaviour differences between the provided user accounts

**Out of scope**
- Performance and load testing
- Security testing (penetration, injection)
- Mobile devices and native apps
- Accessibility audit (noted as a future extension)

## 3. Test items and accounts

| Account | Purpose |
| --- | --- |
| `standard_user` | Baseline: expected correct behaviour |
| `locked_out_user` | Negative login |
| `problem_user` | Exploratory: functional and UI defects |
| `error_user` | Exploratory: error and state handling |
| `visual_user` | Exploratory: visual and data differences |
| `performance_glitch_user` | Not covered in this round |

## 4. Approach

- **Scripted testing:** the cases in [`test-cases.md`](test-cases.md), run against `standard_user` to set the baseline, then repeated for the other accounts.
- **Exploratory testing:** time-boxed sessions comparing each non-standard account against the baseline.
- **Automation:** stable baseline checks are automated in [`../automation`](../automation).
- **Defect reporting:** one report per distinct defect in [`bug-reports/`](bug-reports).

## 5. Environment

| Item | Value |
| --- | --- |
| OS | Windows 11 Pro |
| Browser | Chromium 156 (Playwright build), headless |
| Network | Public internet |

## 6. Entry and exit criteria

**Entry:** site reachable; credentials available; test cases reviewed.
**Exit:** all planned cases executed for in-scope accounts; every failure either logged as a bug or marked as a test error; no unlogged known defects.

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| Public site may change or go down | Record observed behaviour and date in every report |
| Shared environment, no data reset control | Use fresh browser contexts for each run |
| Seeded defects may be intentional | State clearly in reports that this is a demo app |

## 8. Severity and priority definitions

| Severity | Meaning |
| --- | --- |
| Critical | Blocks the core purchase flow with no workaround |
| Major | Core feature wrong or unreliable; workaround exists or only some users affected |
| Minor | Cosmetic or low-impact issue |
