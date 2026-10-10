# QA Portfolio

Iain York: QA engineer moving from Games QA into Software QA.

All work here is built on public demo applications. Nothing comes from employer projects.

## Contents

| Folder | What it shows |
| --- | --- |
| [`automation/`](automation) | Playwright (TypeScript) UI tests against [SauceDemo](https://www.saucedemo.com) and API tests against [Restful-Booker](https://restful-booker.herokuapp.com), run in GitHub Actions |
| [`manual-testing/`](manual-testing) | [Test plan](manual-testing/test-plan.md), [12 test cases](manual-testing/test-cases.md) and [6 bug reports](manual-testing/bug-reports) from exploratory testing of SauceDemo's seeded-defect accounts |
| [`games-to-software.md`](games-to-software.md) | How games QA skills map to software QA (in progress) |

## Running the automated tests

```bash
cd automation
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```
