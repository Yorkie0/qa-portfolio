# Test Cases: SauceDemo

Results below are from the run on 2026-10-10. `standard_user` is the baseline. A dash means the case was not run for that account.

| ID | Area | Priority |
| --- | --- | --- |
| TC-01 to TC-03 | Login | High |
| TC-04 to TC-06 | Product list | High / Medium |
| TC-07 to TC-09 | Cart | High |
| TC-10 to TC-12 | Checkout | High |

---

### TC-01 Valid login
**Steps:** open `/`; enter `standard_user` / `secret_sauce`; click Login.
**Expected:** redirected to `/inventory.html` showing 6 products.

### TC-02 Locked out user
**Steps:** log in as `locked_out_user` / `secret_sauce`.
**Expected:** error message stating the user is locked out; no redirect.

### TC-03 Wrong password
**Steps:** log in as `standard_user` with an incorrect password.
**Expected:** error "Username and password do not match any user in this service".

### TC-04 Product images
**Steps:** log in; inspect the six product images.
**Expected:** each product shows its own distinct image.

### TC-05 Sort by price low to high
**Steps:** choose "Price (low to high)" in the sort control.
**Expected:** prices are in ascending order.

### TC-06 Sort by name Z to A
**Steps:** choose "Name (Z to A)".
**Expected:** names in reverse alphabetical order.

### TC-07 Add all products to cart
**Steps:** click "Add to cart" on every product.
**Expected:** all buttons change to "Remove"; cart badge shows 6.

### TC-08 Remove all products
**Steps:** after TC-07, click "Remove" on every product.
**Expected:** all buttons revert to "Add to cart"; cart badge disappears.

### TC-09 Cart contents
**Steps:** add one product; open the cart.
**Expected:** that product is listed once with the correct price.

### TC-10 Checkout form retains input
**Steps:** from the cart, click Checkout; enter First Name `Test`, Last Name `User`, Postal Code `AB1 2CD`.
**Expected:** each field holds exactly what was typed.

### TC-11 Checkout proceeds with valid details
**Steps:** after TC-10, click Continue.
**Expected:** moves to the order overview (`checkout-step-two.html`).

### TC-12 Checkout validates required fields
**Steps:** leave Last Name empty; click Continue.
**Expected:** stays on the form with "Last Name is required".

---

## Results summary (2026-10-10)

| Case | standard_user | problem_user | error_user | visual_user |
| --- | --- | --- | --- | --- |
| TC-04 Images | Pass | **Fail** (BUG-001) | Pass | Pass |
| TC-05 Sort price | Pass | **Fail** (BUG-002) | **Fail** (BUG-002) | **Fail** (BUG-006) |
| TC-06 Sort name | Pass | **Fail** (BUG-002) | **Fail** (BUG-002) | Pass |
| TC-07 Add all | Pass | **Fail** (BUG-003) | **Fail** (BUG-003) | Pass |
| TC-08 Remove all | Pass | **Fail** (BUG-003) | **Fail** (BUG-003) | Pass |
| TC-10 Form retains input | Pass | **Fail** (BUG-004) | **Fail** (BUG-005) | Pass |
| TC-11 Proceeds | Pass | - | Pass* | Pass |
| TC-12 Validation | - | Pass | **Fail** (BUG-005) | - |

\* TC-11 reached the overview, but only because the empty Last Name was accepted; see BUG-005.

TC-01 to TC-03 and TC-09 are covered by the automated suite for `standard_user` and `locked_out_user`. `visual_user` was checked functionally only (list, cart, checkout form). Layout and styling were not examined; see [`BUG-006`](bug-reports/BUG-006-visual-user-prices-differ.md).
