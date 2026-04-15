// ============ MOCK DATA ============
const POSTS = [
  {
    id: 1,
    author: "Marcus Chen",
    avatar: "https://i.pravatar.cc/80?img=12",
    headline: "Ex-VP of Engineering · 23 yrs at HexaCorp · Available for dog walks",
    time: "2h · 🌍",
    body: "Today I cleaned out my office. I found a 2014 performance review, a company stress ball, and a deep sense of peace I haven't felt in a decade.\n\nTo everyone still inside: the water cooler gossip will continue without you, and that's OK.",
    tag: "Layoff Reflection",
    reactions: ["😭","🤝","🫶"],
    reactionCount: 1487,
    comments: 214,
    reshares: 63,
  },
  {
    id: 2,
    author: "Priya Shah",
    avatar: "https://i.pravatar.cc/80?img=47",
    headline: "Former Senior PM · Currently in pajamas · Available at 3pm",
    time: "4h · 🌍",
    body: "Day 31 of unemployment update:\n• Learned to make croissants (failed)\n• Learned to make bread (succeeded, too much)\n• Watched all of 'Severance' and felt seen\n• Applied to 4 jobs that described me using the word 'synergy'",
    image: "https://picsum.photos/seed/croissant/800/450",
    tag: "Post-Job Hobby",
    reactions: ["👏","🍞","😂"],
    reactionCount: 842,
    comments: 167,
    reshares: 22,
  },
  {
    id: 3,
    author: "BrokenOut News",
    avatar: "https://i.pravatar.cc/80?img=15",
    headline: "Official BrokenOut Account · Verified ✂️",
    time: "6h · 🌍",
    body: "📣 New feature: \"Reality Check\" — a daily 60-second audio reminder that nobody's job is their identity. Opt in from Settings → Existential.\n\nAlso: we've added a Severance Negotiation simulator. Yes, it roasts you if you say yes to the first offer.",
    tag: "Product Update",
    reactions: ["🎉","🤝","💀"],
    reactionCount: 3021,
    comments: 402,
    reshares: 891,
  },
  {
    id: 4,
    author: "Rafael Ortiz",
    avatar: "https://i.pravatar.cc/80?img=33",
    headline: "Retired at 52 · Former Director of Data · Grower of tomatoes",
    time: "1d · 🌍",
    body: "My wife asked what I did today and I said 'I stared at a bird for 14 minutes and didn't check Slack once.'\n\nThis is it. This is the good part.",
    image: "https://picsum.photos/seed/garden/800/450",
    tag: "Retirement Journey",
    reactions: ["❤️","🌱","🐦"],
    reactionCount: 5402,
    comments: 512,
    reshares: 187,
  },
  {
    id: 5,
    author: "Jessica Park",
    avatar: "https://i.pravatar.cc/80?img=24",
    headline: "Ex-Designer · 4 layoffs in 3 years · Taking it as a brand",
    time: "1d · 🌍",
    body: "Someone asked me on a call how I 'handle the uncertainty.'\n\nI said: by refusing to believe any of it was ever certain in the first place.\n\nAnyway — anyone hiring a designer who's done this song and dance before?",
    tag: "Looking For Work",
    reactions: ["🤝","💪","🔥"],
    reactionCount: 2210,
    comments: 341,
    reshares: 78,
  },
];

const PEOPLE = [
  { name: "Marcus Chen", avatar: "https://i.pravatar.cc/120?img=12", role: "Ex-VP Engineering · HexaCorp", reason: "Laid off same quarter" },
  { name: "Priya Shah", avatar: "https://i.pravatar.cc/120?img=47", role: "Former Senior PM · MegaCorp", reason: "3 mutual ex-managers" },
  { name: "Rafael Ortiz", avatar: "https://i.pravatar.cc/120?img=33", role: "Retired · Director of Data", reason: "Joined BrokenOut the same week" },
  { name: "Jessica Park", avatar: "https://i.pravatar.cc/120?img=24", role: "Designer · Between gigs", reason: "Survived 4 reorgs with you" },
  { name: "Tomás Beltrán", avatar: "https://i.pravatar.cc/120?img=65", role: "Ex-CTO · Failed startup", reason: "Worked at Stealth Startup" },
  { name: "Ada Olsen", avatar: "https://i.pravatar.cc/120?img=41", role: "Early Retiree · Former CFO", reason: "Suggested by severance tier" },
];

const JOBS = [
  { company: "Unsync", logo: "U", title: "Staff Engineer (Remote)", loc: "Remote · Full-time", tag: "No standups, ever", extra: "Posted by ex-MegaCorp alum" },
  { company: "Gentle Labs", logo: "G", title: "Principal Designer", loc: "Austin, TX · Hybrid 2/wk", tag: "No 'rockstars'", extra: "Funded for 3 years — no pressure" },
  { company: "Afterglow Co-op", logo: "A", title: "Whatever You're Good At", loc: "Remote · Co-op", tag: "Worker-owned", extra: "32-hr week, full benefits" },
  { company: "Meadowbrook", logo: "M", title: "Part-Time Consultant", loc: "Remote · 15 hrs/wk", tag: "Retirees welcome", extra: "Paid actual respect" },
];

const MESSAGES = [
  { id: 1, name: "Priya Shah", avatar: "https://i.pravatar.cc/80?img=47", snippet: "okay the tomato photo killed me", active: true },
  { id: 2, name: "Marcus Chen", avatar: "https://i.pravatar.cc/80?img=12", snippet: "did your COBRA thing ever come through?" },
  { id: 3, name: "Rafael Ortiz", avatar: "https://i.pravatar.cc/80?img=33", snippet: "come over Sat — garden giving too much" },
  { id: 4, name: "Jessica Park", avatar: "https://i.pravatar.cc/80?img=24", snippet: "wait they actually wrote 'synergy'?? 💀" },
];

const BUBBLES = [
  { who: "them", text: "okay the tomato photo killed me 😭" },
  { who: "me",   text: "Rafael's out here winning at life" },
  { who: "them", text: "I tried making bread last week. Filled the dining room with loaves. My partner asked me to stop." },
  { who: "me",   text: "that's the unemployment arc in 3 parts" },
  { who: "them", text: "phase 1: shock. phase 2: sourdough. phase 3: vague startup idea." },
  { who: "me",   text: "I'm in phase 3, pls save me" },
];

const NOTIFS = [
  { ico: "👋", text: "Marcus Chen viewed your profile", sub: "Probably reminiscing about the reorg" },
  { ico: "🤝", text: "Priya Shah sent you a commiseration request", sub: "3 mutual ex-managers" },
  { ico: "📣", text: "BrokenOut just added 'Rage-Apply' — apply to 50 jobs in one click", sub: "Only for Premium members, 2h ago" },
  { ico: "🎉", text: "You've been on BrokenOut for 47 days!", sub: "That's 47 more than most jobs last" },
  { ico: "💬", text: "Jessica Park commented on your post", sub: "\"This is too real\" — 4h ago" },
  { ico: "🛠", text: "Severance negotiation simulator beta is live", sub: "Try it before it tries you" },
];

// ============ ROUTING ============
const routes = ["home", "network", "jobs", "messages", "profile", "notifications"];

function setRoute(route) {
  if (!routes.includes(route)) route = "home";
  document.querySelectorAll('.route').forEach(el => {
    el.hidden = el.dataset.routeView !== route;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.route === route);
  });
  if (location.hash !== `#${route}`) {
    history.replaceState(null, '', `#${route}`);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ RENDER HELPERS ============
function renderFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = POSTS.map(p => `
    <article class="post" data-post-id="${p.id}">
      <div class="post-head">
        <img src="${p.avatar}" alt=""/>
        <div>
          <div class="post-head-name">${p.author}</div>
          <div class="post-head-sub">${p.headline}</div>
          <div class="post-head-sub">${p.time}</div>
        </div>
      </div>
      <div class="post-body">${escapeHtml(p.body)}</div>
      <div class="post-tag-row"><span class="post-tag">${p.tag}</span></div>
      ${p.image ? `<div class="post-image" style="background-image:url('${p.image}')"></div>` : ''}
      <div class="post-meta">
        <span class="reactions">
          ${p.reactions.map(e => `<span class="emo">${e}</span>`).join('')}
          <span style="margin-left:6px">${p.reactionCount.toLocaleString()}</span>
        </span>
        <span>${p.comments} comments · ${p.reshares} reshares</span>
      </div>
      <div class="post-actions">
        <button data-action="like">
          <svg class="icon" viewBox="0 0 24 24"><path d="M2 9h4v13H2zm20 1c0-1.1-.9-2-2-2h-6.3l1-4.7c0-.5-.2-1-.5-1.3L13 1 6.6 7.4c-.4.4-.6.9-.6 1.5V20c0 1.1.9 2 2 2h9a2 2 0 0 0 1.8-1.2l3-7c.1-.2.2-.5.2-.8z"/></svg>
          Relate
        </button>
        <button data-action="comment">
          <svg class="icon" viewBox="0 0 24 24"><path d="M21 6h-2v9H6v2a1 1 0 0 0 1 1h11l4 4V7a1 1 0 0 0-1-1m-4-4H3a1 1 0 0 0-1 1v14l4-4h11a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></svg>
          Commiserate
        </button>
        <button data-action="reshare">
          <svg class="icon" viewBox="0 0 24 24"><path d="M7 7l-4 4 4 4v-3h7V9H7zm10 10l4-4-4-4v3h-7v2h7z"/></svg>
          Amplify
        </button>
        <button data-action="send">
          <svg class="icon" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
          Vent-Mail
        </button>
      </div>
    </article>
  `).join('');

  feed.querySelectorAll('.post-actions button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'like') {
        btn.classList.toggle('liked');
        const meta = btn.closest('.post').querySelector('.post-meta span:first-child span:last-child');
        if (meta) {
          const n = parseInt(meta.textContent.replace(/,/g,'')) + (btn.classList.contains('liked') ? 1 : -1);
          meta.textContent = n.toLocaleString();
        }
      }
      showToast(`${capitalize(action)}d · this is a demo, nothing is saved`);
    });
  });
}

function renderPeople() {
  document.getElementById('peopleGrid').innerHTML = PEOPLE.map(p => `
    <div class="person-card">
      <div class="pcover"></div>
      <img src="${p.avatar}" alt=""/>
      <strong>${p.name}</strong>
      <small>${p.role}</small>
      <small style="font-style:italic;color:var(--brand-dark)">Because: ${p.reason}</small>
      <button class="btn">+ Commiserate</button>
    </div>
  `).join('');

  document.querySelectorAll('.person-card .btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.textContent = '✓ Commiserating';
      btn.classList.add('primary');
      showToast(`You now share grief with ${PEOPLE[i].name}`);
    });
  });
}

function renderJobs() {
  document.getElementById('jobsList').innerHTML = JOBS.map(j => `
    <div class="job-card">
      <div class="job-logo">${j.logo}</div>
      <div style="flex:1">
        <h4>${j.title} · ${j.company}</h4>
        <small>${j.loc}</small><br/>
        <small>${j.extra}</small><br/>
        <span class="tag">${j.tag}</span>
      </div>
      <button class="btn primary apply">Apply</button>
    </div>
  `).join('');

  document.querySelectorAll('.job-card .apply').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.textContent = '✓ Applied';
      btn.disabled = true;
      btn.style.opacity = .7;
      showToast(`Application sent to ${JOBS[i].company}`);
    });
  });
}

function renderMessages() {
  document.getElementById('msgList').innerHTML = MESSAGES.map(m => `
    <li ${m.active ? 'class="active"' : ''} data-id="${m.id}">
      <img src="${m.avatar}" alt=""/>
      <div>
        <strong>${m.name}</strong>
        <small>${m.snippet}</small>
      </div>
    </li>
  `).join('');

  document.getElementById('msgBubbles').innerHTML = BUBBLES.map(b => `
    <div class="bubble ${b.who}">${escapeHtml(b.text)}</div>
  `).join('');
  scrollMsgsToBottom();

  document.querySelectorAll('#msgList li').forEach(li => {
    li.addEventListener('click', () => {
      document.querySelectorAll('#msgList li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');
    });
  });

  const input = document.getElementById('msgInput');
  const send = document.getElementById('msgSendBtn');
  const handleSend = () => {
    const val = input.value.trim();
    if (!val) return;
    addBubble('me', val);
    input.value = '';
    setTimeout(() => addBubble('them', fakeReply(val)), 900);
  };
  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
}

function addBubble(who, text) {
  const bubbles = document.getElementById('msgBubbles');
  const div = document.createElement('div');
  div.className = `bubble ${who}`;
  div.textContent = text;
  bubbles.appendChild(div);
  scrollMsgsToBottom();
}
function scrollMsgsToBottom() {
  const bubbles = document.getElementById('msgBubbles');
  bubbles.scrollTop = bubbles.scrollHeight;
}
function fakeReply(input) {
  const pool = [
    "mood.",
    "literally same",
    "ok but have you tried the sourdough",
    "I'm going to put that on a t-shirt",
    "truly unemployed-core content",
    "send a CV, let's make each other feel less alone"
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

function renderNotifs() {
  document.getElementById('notifList').innerHTML = NOTIFS.map(n => `
    <li>
      <div class="nico">${n.ico}</div>
      <div>
        <div>${n.text}</div>
        <small>${n.sub}</small>
      </div>
    </li>
  `).join('');
}

// ============ UTIL ============
function escapeHtml(s) {
  return s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.hidden = false;
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.hidden = true, 300);
  }, 2200);
}

// ============ BOOT ============
function boot() {
  renderFeed();
  renderPeople();
  renderJobs();
  renderMessages();
  renderNotifs();

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      setRoute(el.dataset.route);
    });
  });

  // daysFree ticker that goes up over a few seconds on load
  const d = document.getElementById('daysFreeCount');
  if (d) {
    let n = 0; const target = 47;
    const iv = setInterval(() => {
      n++;
      d.textContent = n;
      if (n >= target) clearInterval(iv);
    }, 25);
  }

  // composer trigger just shows toast
  document.querySelector('.composer-trigger').addEventListener('click', () => {
    showToast("Composer isn't wired in this demo — vent to a friend instead");
  });
  document.querySelectorAll('.composer-actions button').forEach(b => {
    b.addEventListener('click', () => showToast(`${b.textContent.trim()} — coming soon`));
  });

  // hash routing
  const initial = location.hash.slice(1) || 'home';
  setRoute(initial);
}

document.addEventListener('DOMContentLoaded', boot);

// expose for demo.js
window.__app = { setRoute, showToast };
