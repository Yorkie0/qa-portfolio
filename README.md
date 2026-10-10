# QA Portfolio

[![Tests](https://github.com/Yorkie0/qa-portfolio/actions/workflows/tests.yml/badge.svg)](https://github.com/Yorkie0/qa-portfolio/actions/workflows/tests.yml)

Iain York: QA engineer moving from Games QA into Software QA.

All work here is built on public demo applications. Nothing comes from employer projects.

## Contents

| Folder | What it shows |
| --- | --- |
| [`automation/`](automation) | Playwright (TypeScript) UI tests against [SauceDemo](https://www.saucedemo.com) and API tests against [Restful-Booker](https://restful-booker.herokuapp.com), run in GitHub Actions |
| [`manual-testing/`](manual-testing) | [Test plan](manual-testing/test-plan.md), [12 test cases](manual-testing/test-cases.md) and [6 bug reports](manual-testing/bug-reports) from exploratory testing of SauceDemo's seeded-defect accounts |
| [`site/`](site) | Portfolio website in plain HTML, CSS and JS, with its own Playwright tests. Open `site/index.html` in a browser to view it |
| [`games-to-software.md`](games-to-software.md) | How games QA skills map to software QA (in progress) |

## Running the automated tests

```bash
cd automation
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```
