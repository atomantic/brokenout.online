// ============ GUIDED TOUR / AUTO DEMO ============
//
// Each step can:
//   - route: switch to a route first
//   - target: CSS selector to spotlight
//   - title + body: caption text
//   - pos: 'right' | 'left' | 'top' | 'bottom' for caption arrow
//   - action: optional fn(el) run after spotlight lands
//   - hold: ms to stay on this step
//

const TOUR = [
  {
    route: 'home',
    target: '.brand',
    title: "Welcome to BrokenOut",
    body: "The social network for people who've been laid off, restructured out, or blissfully retired. It's LinkedIn, but honest.",
    pos: 'bottom',
    hold: 2800,
  },
  {
    route: 'home',
    target: '[data-tour="profile-card"]',
    title: "Your broken-out profile",
    body: "Track your severance tier, days of freedom, and status. (Dana's at 47 days and counting.)",
    pos: 'right',
    hold: 2800,
  },
  {
    route: 'home',
    target: '[data-tour="broken-from"]',
    title: "Broken Out From",
    body: "A résumé of every company that let you go — so you don't have to keep updating LinkedIn's 'experience' section in shame.",
    pos: 'right',
    hold: 2800,
  },
  {
    route: 'home',
    target: '[data-tour="composer"]',
    title: "Vent, share, announce",
    body: "Post a layoff story, a recipe, a rant, or a tomato photo. We validate all forms of grief-content.",
    pos: 'bottom',
    hold: 2800,
  },
  {
    route: 'home',
    target: '.post:nth-child(1)',
    title: "The feed",
    body: "Posts from people who get it. No 'thrilled to announce' energy here.",
    pos: 'left',
    scrollTo: true,
    hold: 3000,
  },
  {
    route: 'home',
    target: '.post:nth-child(1) [data-action="like"]',
    title: "Relate, don't like",
    body: "We renamed Like to 'Relate', Comment to 'Commiserate', and Share to 'Amplify'. Watch —",
    pos: 'top',
    action: (el) => { setTimeout(() => ghostClick(el), 400); },
    hold: 2600,
  },
  {
    route: 'network',
    target: '.route-network .route-title',
    title: "Commiserations, not connections",
    body: "Grow your network the right way: with people who also got the 'strategic realignment' email.",
    pos: 'bottom',
    hold: 2600,
  },
  {
    route: 'network',
    target: '.person-card:nth-child(1) .btn',
    title: "Share the grief",
    body: "One click and you're officially commiserating. It's more bonding than 'Connect' ever was.",
    pos: 'right',
    action: (el) => { setTimeout(() => ghostClick(el), 400); },
    hold: 2400,
  },
  {
    route: 'jobs',
    target: '.route-jobs .route-title',
    title: "Opportunities, not jobs",
    body: "Find meaning while your severance pays the rent — unemployment paperwork, UBI columns, pottery, porch-writing. Anything but another standup.",
    pos: 'bottom',
    hold: 2600,
  },
  {
    route: 'jobs',
    target: '.job-card:nth-child(3) .apply',
    title: "One-click in",
    body: "No cover letter, no interview loop, no take-home project. You've already been broken out — we're just pointing you somewhere meaningful.",
    pos: 'left',
    action: (el) => { setTimeout(() => ghostClick(el), 400); },
    hold: 2600,
  },
  {
    route: 'messages',
    target: '.route-messages .route-title',
    title: "Vent Mail",
    body: "Direct messages with built-in empathy. No recruiter spam — we block 'synergy' automatically.",
    pos: 'bottom',
    hold: 2600,
  },
  {
    route: 'messages',
    target: '#msgInput',
    title: "Type with feeling",
    body: "Watch Dana commiserate in real time.",
    pos: 'top',
    action: async (el) => {
      await typeInto(el, "tempted to pivot to pottery tbh");
      await delay(300);
      ghostClick(document.getElementById('msgSendBtn'));
    },
    hold: 3000,
  },
  {
    route: 'profile',
    target: '.profile-full .pf-body h1',
    title: "Your story, expanded",
    body: "The full profile: your Breakup Story, your experience (until recently), and skills that didn't save you.",
    pos: 'right',
    scrollTo: true,
    hold: 3000,
  },
  {
    route: 'profile',
    target: '.exp-list',
    title: "Experience, honestly",
    body: "Every role ends with *why* it ended. 'Restructured out of relevance' is the new 'pursuing new opportunities.'",
    pos: 'right',
    scrollTo: true,
    hold: 3000,
  },
  {
    route: 'home',
    target: '[data-tour="promo"]',
    title: "Get on the waitlist",
    body: "This whole thing is a demo of a site we're actually building. Drop your email and we'll ping you when the doors open.",
    pos: 'left',
    scrollTo: true,
    hold: 5200,
  },
];

// ============ STATE ============
let tourIdx = 0;
let tourRunning = false;
let tourTimer = null;

// ============ DOM REFS ============
const spot = document.getElementById('spotlight');
const spotHole = document.getElementById('spotHole');
const spotCap = document.getElementById('spotCaption');
const spotTitle = document.getElementById('spotTitle');
const spotBody = document.getElementById('spotBody');
const cursor = document.getElementById('ghostCursor');
const demoBar = document.getElementById('demoBar');
const toggleBtn = document.getElementById('demoToggleBtn');
const toggleLabel = toggleBtn.querySelector('.demo-btn-label');
const iconPlay = toggleBtn.querySelector('.demo-icon-play');
const iconStop = toggleBtn.querySelector('.demo-icon-stop');
const progressFill = document.querySelector('.demo-progress-fill');
const stepLabel = document.getElementById('demoStep');

// ============ HELPERS ============
const delay = (ms) => new Promise(r => setTimeout(r, ms));

function moveCursorTo(x, y, click = false) {
  cursor.style.opacity = '1';
  cursor.style.left = (x - 4) + 'px';
  cursor.style.top = (y - 4) + 'px';
  if (click) {
    cursor.classList.add('click');
    setTimeout(() => cursor.classList.remove('click'), 500);
  }
}

function ghostClick(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  moveCursorTo(x, y, true);
  setTimeout(() => {
    el.click();
  }, 250);
}

async function typeInto(el, text) {
  el.focus();
  el.value = '';
  for (const ch of text) {
    el.value += ch;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(45 + Math.random() * 40);
  }
}

function positionCaption(target, pos) {
  const r = target.getBoundingClientRect();
  const cw = 320, margin = 16;
  let left, top;

  const vw = window.innerWidth, vh = window.innerHeight;

  switch (pos) {
    case 'right':
      left = r.right + margin;
      top = r.top;
      break;
    case 'left':
      left = r.left - cw - margin;
      top = r.top;
      break;
    case 'bottom':
      left = r.left;
      top = r.bottom + margin;
      break;
    case 'top':
      left = r.left;
      top = r.top - 140;
      break;
    default:
      left = r.right + margin;
      top = r.top;
  }

  // keep on screen
  if (left + cw + 8 > vw) left = vw - cw - 8;
  if (left < 8) left = 8;
  if (top + 140 > vh) top = vh - 150;
  if (top < 72) top = 72;

  spotCap.style.left = left + 'px';
  spotCap.style.top = top + 'px';
  spotCap.dataset.pos = pos;
}

function positionSpotlight(target) {
  const r = target.getBoundingClientRect();
  const pad = 8;
  spotHole.style.left = (r.left - pad) + 'px';
  spotHole.style.top = (r.top - pad) + 'px';
  spotHole.style.width = (r.width + pad * 2) + 'px';
  spotHole.style.height = (r.height + pad * 2) + 'px';
}

function clearHighlight() {
  spot.hidden = true;
  cursor.style.opacity = '0';
}

// ============ TOUR ENGINE ============
async function runStep() {
  if (!tourRunning) return;

  if (tourIdx >= TOUR.length) {
    endTour(true);
    return;
  }

  const step = TOUR[tourIdx];
  stepLabel.textContent = `Step ${tourIdx + 1} of ${TOUR.length} · ${step.title}`;
  progressFill.style.width = `${(tourIdx / TOUR.length) * 100}%`;

  if (step.route) {
    window.__app.setRoute(step.route);
    await delay(450);
  }

  const target = document.querySelector(step.target);
  // Skip missing or hidden targets (e.g. sidebar elements on mobile
  // where col-left/col-right cards are display:none).
  if (!target || target.offsetParent === null || target.getBoundingClientRect().width === 0) {
    tourIdx++;
    runStep();
    return;
  }

  if (step.scrollTo) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await delay(500);
  }

  spot.hidden = false;
  positionSpotlight(target);

  spotTitle.textContent = step.title;
  spotBody.textContent = step.body;
  positionCaption(target, step.pos || 'right');

  const r = target.getBoundingClientRect();
  moveCursorTo(r.left + r.width / 2, r.top + r.height / 2);

  if (typeof step.action === 'function') {
    step.action(target);
  }

  tourTimer = setTimeout(() => {
    tourIdx++;
    runStep();
  }, step.hold || 3500);
}

function setToggleMode(running) {
  demoBar.dataset.running = running ? 'true' : 'false';
  iconPlay.hidden = running;
  iconStop.hidden = !running;
  toggleLabel.textContent = running ? 'Stop Tour' : 'Start Guided Tour';
  toggleBtn.setAttribute('aria-label', running ? 'Stop guided tour' : 'Start guided tour');
}

function startTour() {
  tourIdx = 0;
  tourRunning = true;
  setToggleMode(true);
  runStep();
}

function endTour(finished) {
  tourRunning = false;
  clearTimeout(tourTimer);
  clearHighlight();
  setToggleMode(false);
  stepLabel.textContent = '';
  progressFill.style.width = '0%';
  if (finished) {
    openSignupModal();
  }
}

let signupModalShown = false;

function openSignupModal() {
  const modal = document.getElementById('signupModal');
  if (!modal) return;
  modal.hidden = false;
  signupModalShown = true;
  stopIdleWatcher();
  // Focus the email input for quick typing (after the pop-in animation)
  setTimeout(() => modal.querySelector('input[type="email"]')?.focus(), 240);
}

function closeSignupModal() {
  const modal = document.getElementById('signupModal');
  if (!modal) return;
  modal.hidden = true;
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-signup-dismiss]')) closeSignupModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSignupModal();
});

// Lets app.js (or the tour) nudge the visitor toward the waitlist from
// any "not wired" interaction.
document.addEventListener('brokenout:signup-prompt', openSignupModal);

// Global catch-all: clicking any control that isn't in this allowlist
// pops the signup modal instead of doing nothing / showing a demo toast.
// Navigation, tour controls, and the signup form itself still work.
const SIGNUP_ALLOW = [
  '[data-route]',           // nav links + brand
  '#demoToggleBtn',         // tour toggle
  '[data-signup-dismiss]',  // modal close targets
  '.signup-modal',          // modal + form inside
  '.waitlist-form',         // sidebar waitlist form + its input/submit
].join(',');

document.addEventListener('click', (e) => {
  if (tourRunning) return;
  if (e.target.closest(SIGNUP_ALLOW)) return;
  const clickable = e.target.closest('a, button, [role="button"]');
  if (!clickable) return;
  e.preventDefault();
  e.stopPropagation();
  markSeen();
  openSignupModal();
}, true);

// ============ IDLE SIGNUP PROMPT ============
// If the visitor sits still for a while, pop the signup modal.
// Skips if the tour is running or the modal has already been shown,
// and respects a 7-day cooldown per browser.
const IDLE_MS = 45000;
const IDLE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const IDLE_KEY = 'brokenout_signup_seen_at';
let idleTimer = null;

function recentlySeen() {
  try {
    const t = parseInt(window.localStorage.getItem(IDLE_KEY) || '0', 10);
    return t && (Date.now() - t) < IDLE_COOLDOWN_MS;
  } catch (e) { return false; }
}

function markSeen() {
  try { window.localStorage.setItem(IDLE_KEY, String(Date.now())); } catch (e) {}
}

function resetIdleTimer() {
  if (signupModalShown || tourRunning) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (signupModalShown || tourRunning) return;
    markSeen();
    openSignupModal();
  }, IDLE_MS);
}

function stopIdleWatcher() {
  clearTimeout(idleTimer);
  idleTimer = null;
}

if (!recentlySeen()) {
  ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(evt => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
  });
  resetIdleTimer();
}

function onToggle() {
  if (tourRunning) endTour(false);
  else startTour();
}

// ============ WIRE UP ============
toggleBtn.addEventListener('click', onToggle);

// Recompute spotlight/caption positions on scroll + resize
let rafId = null;
function refresh() {
  if (!tourRunning) return;
  const step = TOUR[tourIdx];
  if (!step) return;
  const target = document.querySelector(step.target);
  if (!target) return;
  positionSpotlight(target);
  positionCaption(target, step.pos || 'right');
}
window.addEventListener('scroll', () => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(refresh);
}, true);
window.addEventListener('resize', refresh);

