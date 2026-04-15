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
    hold: 4200,
  },
  {
    route: 'home',
    target: '[data-tour="profile-card"]',
    title: "Your broken-out profile",
    body: "Track your severance tier, days of freedom, and status. (Dana's at 47 days and counting.)",
    pos: 'right',
    hold: 4200,
  },
  {
    route: 'home',
    target: '[data-tour="broken-from"]',
    title: "Broken Out From",
    body: "A résumé of every company that let you go — so you don't have to keep updating LinkedIn's 'experience' section in shame.",
    pos: 'right',
    hold: 4200,
  },
  {
    route: 'home',
    target: '[data-tour="composer"]',
    title: "Vent, share, announce",
    body: "Post a layoff story, a recipe, a rant, or a tomato photo. We validate all forms of grief-content.",
    pos: 'bottom',
    hold: 4200,
  },
  {
    route: 'home',
    target: '.post:nth-child(1)',
    title: "The feed",
    body: "Posts from people who get it. No 'thrilled to announce' energy here.",
    pos: 'left',
    scrollTo: true,
    hold: 4500,
  },
  {
    route: 'home',
    target: '.post:nth-child(1) [data-action="like"]',
    title: "Relate, don't like",
    body: "We renamed Like to 'Relate', Comment to 'Commiserate', and Share to 'Amplify'. Watch —",
    pos: 'top',
    action: (el) => { setTimeout(() => ghostClick(el), 500); },
    hold: 3800,
  },
  {
    route: 'home',
    target: '[data-tour="promo"]',
    title: "BrokenOut Premium™",
    body: "Severance calculator, unlimited anonymous vents, and an AI coach that doesn't ask about your 5-year plan.",
    pos: 'left',
    scrollTo: true,
    hold: 4200,
  },
  {
    route: 'network',
    target: '.route-network .route-title',
    title: "Commiserations, not connections",
    body: "Grow your network the right way: with people who also got the 'strategic realignment' email.",
    pos: 'bottom',
    hold: 4000,
  },
  {
    route: 'network',
    target: '.person-card:nth-child(1) .btn',
    title: "Share the grief",
    body: "One click and you're officially commiserating. It's more bonding than 'Connect' ever was.",
    pos: 'right',
    action: (el) => { setTimeout(() => ghostClick(el), 500); },
    hold: 3500,
  },
  {
    route: 'jobs',
    target: '.route-jobs .route-title',
    title: "Opportunities (eventually)",
    body: "Curated, human listings. No rockstar ninjas, no 'family' vibes, no 10x warriors. Just jobs.",
    pos: 'bottom',
    hold: 4000,
  },
  {
    route: 'jobs',
    target: '.job-card:nth-child(3) .apply',
    title: "One-click apply",
    body: "Because the 47-field application form was part of what broke us in the first place.",
    pos: 'left',
    action: (el) => { setTimeout(() => ghostClick(el), 500); },
    hold: 3800,
  },
  {
    route: 'messages',
    target: '.route-messages .route-title',
    title: "Vent Mail",
    body: "Direct messages with built-in empathy. No recruiter spam — we block 'synergy' automatically.",
    pos: 'bottom',
    hold: 3800,
  },
  {
    route: 'messages',
    target: '#msgInput',
    title: "Type with feeling",
    body: "Watch Dana commiserate in real time.",
    pos: 'top',
    action: async (el) => {
      await typeInto(el, "tempted to pivot to pottery tbh");
      await delay(400);
      ghostClick(document.getElementById('msgSendBtn'));
    },
    hold: 4500,
  },
  {
    route: 'profile',
    target: '.profile-full .pf-body h1',
    title: "Your story, expanded",
    body: "The full profile: your Breakup Story, your experience (until recently), and skills that didn't save you.",
    pos: 'right',
    scrollTo: true,
    hold: 4500,
  },
  {
    route: 'profile',
    target: '.exp-list',
    title: "Experience, honestly",
    body: "Every role ends with *why* it ended. 'Restructured out of relevance' is the new 'pursuing new opportunities.'",
    pos: 'right',
    scrollTo: true,
    hold: 4500,
  },
  {
    route: 'home',
    target: '.brand',
    title: "That's BrokenOut.",
    body: "A place that meets people where they actually are. Ready to get broken out together?",
    pos: 'bottom',
    hold: 4500,
  },
];

// ============ STATE ============
let tourIdx = 0;
let tourRunning = false;
let tourPaused = false;
let tourTimer = null;

// ============ DOM REFS ============
const spot = document.getElementById('spotlight');
const spotHole = document.getElementById('spotHole');
const spotCap = document.getElementById('spotCaption');
const spotTitle = document.getElementById('spotTitle');
const spotBody = document.getElementById('spotBody');
const cursor = document.getElementById('ghostCursor');
const startBtn = document.getElementById('startDemoBtn');
const pauseBtn = document.getElementById('pauseDemoBtn');
const stopBtn = document.getElementById('stopDemoBtn');
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
  if (tourPaused) return;

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
  if (!target) {
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

function startTour() {
  tourIdx = 0;
  tourRunning = true;
  tourPaused = false;
  startBtn.hidden = true;
  pauseBtn.hidden = false;
  stopBtn.hidden = false;
  pauseBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/></svg> Pause`;
  runStep();
}

function togglePause() {
  tourPaused = !tourPaused;
  if (tourPaused) {
    clearTimeout(tourTimer);
    pauseBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg> Resume`;
  } else {
    pauseBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/></svg> Pause`;
    runStep();
  }
}

function endTour(finished) {
  tourRunning = false;
  tourPaused = false;
  clearTimeout(tourTimer);
  clearHighlight();
  startBtn.hidden = false;
  pauseBtn.hidden = true;
  stopBtn.hidden = true;
  stepLabel.textContent = finished ? 'Tour complete — click Start to replay' : '';
  progressFill.style.width = finished ? '100%' : '0%';
  if (finished) {
    window.__app.showToast("Tour complete — welcome to BrokenOut");
  }
}

// ============ WIRE UP ============
startBtn.addEventListener('click', startTour);
pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', () => endTour(false));

// Recompute spotlight/caption positions on scroll + resize
let rafId = null;
function refresh() {
  if (!tourRunning || tourPaused) return;
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

// auto-start tour once page loads, after a short delay
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!tourRunning) startTour();
  }, 900);
});
