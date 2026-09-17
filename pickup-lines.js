/* Nerd Pick-Up Lines — one per day, rotated by date.
 *
 * The feature is data-driven: add a line to LINES and it joins the rotation.
 * Today's pick is deterministic (day-of-year % length), so every reader on a
 * given day sees the same line, and it advances one per day without a server.
 *
 * Seeded with the TEMU sticker that started it.
 */
const LINES = [
  {
    text: "\"My brain has too many tabs open. 4 are frozen, and I have no idea where the music is coming from.\" — And you're pinned to my desktop.",
    tag: "the original",
  },
  {
    text: "Are you a keyboard? Because you're just my type.",
    tag: "classic",
  },
  {
    text: "You must be a pull request, because I've been waiting for someone to merge into my life.",
    tag: "git",
  },
  {
    text: "Is your name Wi-Fi? Because I'm feeling a connection.",
    tag: "classic",
  },
  {
    text: "You had me at 'hello, world'.",
    tag: "first commit",
  },
  {
    text: "Are you a semicolon? Because I'd be lost without you at the end of my line.",
    tag: "syntax",
  },
  {
    text: "I'm no photographer, but I can definitely picture us in the same array.",
    tag: "data structures",
  },
  {
    text: "You must be a 200 OK, because you're exactly the response I was hoping for.",
    tag: "http",
  },
  {
    text: "Are you a neural network? Because you've got layers I want to get to know.",
    tag: "ai",
  },
  {
    text: "I'd never put you in a try-catch, because you're no exception — you're the rule.",
    tag: "error handling",
  },
  {
    text: "You must be open source, because I want to contribute to your happiness.",
    tag: "oss",
  },
  {
    text: "Are you a deprecated API? Because I can't seem to let you go.",
    tag: "legacy",
  },
  {
    text: "My love for you has no memory leaks — it only grows on the heap.",
    tag: "systems",
  },
  {
    text: "Are you recursion? Because the more I think about you, the deeper I fall.",
    tag: "algorithms",
  },
  {
    text: "You must be a clean diff, because you make my heart conflict-free.",
    tag: "git",
  },
  {
    text: "Is your name sudo? Because you make me feel like I can do anything.",
    tag: "unix",
  },
  {
    text: "You must be a breakpoint, because you make me stop and pay attention.",
    tag: "debugging",
  },
  {
    text: "Are you a lambda? Because you're short, elegant, and exactly what I needed.",
    tag: "functional",
  },
  {
    text: "I don't need garbage collection — I'd never throw you away.",
    tag: "systems",
  },
  {
    text: "Are you a private key? Because you're the only one who can unlock me.",
    tag: "security",
  },
  {
    text: "You must be a unit test, because you make everything else pass.",
    tag: "testing",
  },
  {
    text: "Is your name Cache? Because you're always on my mind.",
    tag: "performance",
  },
  {
    text: "You must be a monorepo, because everything I need is right here with you.",
    tag: "tooling",
  },
  {
    text: "Are you a cURL command? Because you just fetched my heart.",
    tag: "unix",
  },
  {
    text: "I'd refactor my whole codebase just to be closer to you.",
    tag: "refactoring",
  },
  {
    text: "You must be localhost, because with you I feel right at home.",
    tag: "networking",
  },
  {
    text: "Are you a race condition? Because my heart skips every time you're near.",
    tag: "concurrency",
  },
  {
    text: "You're the CSS to my HTML — you make everything look better.",
    tag: "frontend",
  },
  {
    text: "Are you a stack trace? Because I want to follow you all the way down.",
    tag: "debugging",
  },
  {
    text: "My uptime is 100% when I'm with you.",
    tag: "sre",
  },
  {
    text: "You must be a zero-day, because I never saw you coming.",
    tag: "security",
  },
];

// Deterministic daily pick. Day-of-year selects the line, so it advances one
// per day and every reader sees the same one.
function pickOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);
  return LINES[(day - 1) % LINES.length];
}

// Render into #pickup-line if present.
(function () {
  const el = document.getElementById("pickup-line");
  if (!el) return;
  const line = pickOfTheDay();
  el.innerHTML = `
    <span class="pickup-label">NERD PICK-UP LINE OF THE DAY</span>
    <p class="pickup-text">&ldquo;${line.text}&rdquo;</p>
    <div class="pickup-meta">
      <span class="pickup-tag">${line.tag}</span>
      <span class="pickup-author">— Joseph Calitoy</span>
      <button class="pickup-share" type="button" aria-label="Share this pick-up line">Share</button>
    </div>
  `;

  const shareBtn = el.querySelector(".pickup-share");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const text = `"${line.text}" — nerd pick-up line of the day`;
      const url = "https://openedterminal.com/";
      try {
        if (navigator.share) {
          await navigator.share({ title: "Nerd Pick-Up Line of the Day", text, url });
        } else {
          await navigator.clipboard.writeText(`${text} ${url}`);
          shareBtn.textContent = "Copied";
          setTimeout(() => { shareBtn.textContent = "Share"; }, 1600);
        }
      } catch (_) {}
    });
  }
})();
