// Bug reports shown on the site. Full write-ups live in manual-testing/bug-reports.
const REPO = 'https://github.com/Yorkie0/qa-portfolio/blob/main/manual-testing/bug-reports/';

const BUGS = [
  {
    id: 'BUG-001',
    title: 'All products show the same image',
    severity: 'Major',
    accounts: ['problem_user'],
    steps: ['Log in as problem_user.', 'Look at the product images on the inventory page.'],
    expected: 'Each of the six products shows its own image.',
    actual: 'All six products show the same image (1 distinct image source across 6 products).',
    file: 'BUG-001-problem-user-identical-images.md',
  },
  {
    id: 'BUG-002',
    title: 'Product sorting has no effect',
    severity: 'Major',
    accounts: ['problem_user', 'error_user'],
    steps: ['Log in as an affected user.', 'Choose "Price (low to high)" in the sort dropdown.', 'Read the prices in display order.'],
    expected: '$7.99, $9.99, $15.99, $15.99, $29.99, $49.99',
    actual: 'List stays in default order: $29.99, $9.99, $15.99, $49.99, $7.99, $15.99',
    file: 'BUG-002-sorting-has-no-effect.md',
  },
  {
    id: 'BUG-003',
    title: 'Add to cart / Remove only works on some products',
    severity: 'Critical',
    accounts: ['problem_user', 'error_user'],
    steps: ['Log in as an affected user.', 'Click "Add to cart" on all six products.', 'Click every button again.'],
    expected: 'All six switch to "Remove" and the badge shows 6. Clicking again empties the cart.',
    actual: 'Only 3 of 6 are added (badge shows 3). Clicking again changes nothing, so items cannot be removed.',
    file: 'BUG-003-add-remove-cart-unreliable.md',
  },
  {
    id: 'BUG-004',
    title: 'Last name input goes into the First Name field',
    severity: 'Major',
    accounts: ['problem_user'],
    steps: ['Start checkout as problem_user.', 'Type "Test", "User" and "AB1 2CD" into First Name, Last Name and Postal Code.', 'Click Continue.'],
    expected: 'Fields hold what was typed and checkout continues.',
    actual: 'First Name shows "User", Last Name is empty, and checkout stops with "Last Name is required".',
    file: 'BUG-004-last-name-typed-into-first-name.md',
  },
  {
    id: 'BUG-005',
    title: 'Last name is discarded but checkout continues',
    severity: 'Major',
    accounts: ['error_user'],
    steps: ['Start checkout as error_user.', 'Fill in all three fields.', 'Click Continue.'],
    expected: 'Last Name holds the typed value.',
    actual: 'Last Name is empty, yet checkout moves on with no validation error.',
    file: 'BUG-005-error-user-last-name-lost.md',
  },
  {
    id: 'BUG-006',
    title: 'Prices differ from the catalogue and price sort is wrong',
    severity: 'Critical',
    accounts: ['visual_user'],
    steps: ['Log in as visual_user.', 'Choose "Price (low to high)".', 'Compare with standard_user.'],
    expected: '$7.99, $9.99, $15.99, $15.99, $29.99, $49.99',
    actual: '$72.15, $52.7, $41.24, $49.13, $10.65, $72.99: wrong prices, wrong order, inconsistent formatting.',
    file: 'BUG-006-visual-user-prices-differ.md',
  },
];

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderBug(bug) {
  const accounts = bug.accounts.map((a) => `<code>${escapeHtml(a)}</code>`).join(', ');
  const steps = bug.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('');
  return `
    <details class="bug" data-severity="${bug.severity}">
      <summary>
        <div class="bug-head">
          <span class="bug-id">${bug.id}</span>
          <span class="badge badge-${bug.severity}">${bug.severity}</span>
        </div>
        <p class="bug-title">${escapeHtml(bug.title)}</p>
        <p class="bug-accounts">Affects ${accounts}</p>
      </summary>
      <div class="bug-body">
        <h4>Steps</h4><ol>${steps}</ol>
        <h4>Expected</h4><p>${escapeHtml(bug.expected)}</p>
        <h4>Actual</h4><p>${escapeHtml(bug.actual)}</p>
        <a class="text-link" href="${REPO}${bug.file}" target="_blank" rel="noopener">Full report →</a>
      </div>
    </details>`;
}

function setupBugs() {
  const list = document.getElementById('bug-list');
  const count = document.querySelector('.bug-count');
  const filters = document.querySelectorAll('.filter');

  list.innerHTML = BUGS.map(renderBug).join('');

  function applyFilter(severity) {
    let shown = 0;
    list.querySelectorAll('.bug').forEach((el) => {
      const visible = severity === 'all' || el.dataset.severity === severity;
      el.hidden = !visible;
      if (visible) shown++;
    });
    filters.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.filter === severity)));
    count.textContent = `Showing ${shown} of ${BUGS.length} bugs`;
  }

  filters.forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  applyFilter('all');
}

function setupTheme() {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');

  function updateLabel() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} theme`);
  }

  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    updateLabel();
  });
  updateLabel();
}

function setupMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
}

document.getElementById('year').textContent = new Date().getFullYear();
setupBugs();
setupTheme();
setupMobileNav();
