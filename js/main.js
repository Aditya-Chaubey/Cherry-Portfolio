/* ============================================================
   PRERIKA SINGH — Portfolio v5 interactions
   ============================================================ */
(function () {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = matchMedia("(min-width: 901px)").matches;
  const notMobile = matchMedia("(min-width: 761px)").matches;
  const hasGSAP = typeof gsap !== "undefined";
  if (hasGSAP && typeof ScrollTrigger !== "undefined") { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }
  if (hasGSAP && typeof MotionPathPlugin !== "undefined") gsap.registerPlugin(MotionPathPlugin);
  let lenis = null, cursorAPI = null, modalOpen = false;

  /* ---- SVG ART ---- */
  const GIRL_SVG = `<svg class="girlsvg" viewBox="0 0 64 104">
    <path class="gs-hairb" d="M11 33 C9 12 55 12 53 33 C57 58 54 82 46 94 C45 80 45 66 44 56 C44 68 42 84 39 94 C38 80 38 66 37 56 C36 70 34 86 32 96 C30 86 28 70 27 56 C26 66 26 80 25 94 C22 84 20 68 20 56 C19 66 19 80 18 94 C10 82 7 58 11 33 Z" fill="#2a1c16"/>
    <g class="gs-legB"><rect x="29" y="66" width="7" height="21" rx="3.5" fill="#d49a6a"/><rect x="27" y="84" width="11" height="6.5" rx="3.2" fill="#46352a"/></g>
    <g class="gs-armB"><rect x="15" y="49" width="6" height="19" rx="3" fill="#d49a6a"/></g>
    <path d="M20 49 C24 44 40 44 44 49 L50 78 H14 Z" fill="#E8C857"/>
    <path d="M26 50 H38 L39 72 H25 Z" fill="#f7efe1" opacity=".9"/>
    <path d="M28 47 h8 v6 h-8 z" fill="#f3d3a8"/>
    <g class="gs-legF"><rect x="28" y="66" width="7" height="21" rx="3.5" fill="#efb079"/><rect x="26" y="84" width="11" height="6.5" rx="3.2" fill="#5e4632"/></g>
    <g class="gs-armF"><rect x="43" y="49" width="6" height="19" rx="3" fill="#efb079"/></g>
    <circle cx="32" cy="30" r="16.5" fill="#f4cfa6"/>
    <path class="gs-hairf" d="M14 32 C12 7 52 7 50 32 C50 17 43 13 38 16 C37 8 27 8 26 16 C21 13 14 17 14 32 Z" fill="#2a1c16"/>
    <path d="M15 33 C14 23 16 16 20 14 C17 23 18 29 19 34 Z" fill="#231711"/>
    <path d="M49 33 C50 23 48 16 44 14 C47 23 46 29 45 34 Z" fill="#231711"/>
    <circle cx="16.5" cy="32" r="2.3" fill="#eebf93"/><circle cx="47.5" cy="32" r="2.3" fill="#eebf93"/>
    <ellipse cx="25.5" cy="31" rx="2" ry="2.5" fill="#241712"/><circle cx="26.3" cy="30.2" r=".6" fill="#fff"/>
    <ellipse cx="38.5" cy="31" rx="2" ry="2.5" fill="#241712"/><circle cx="39.3" cy="30.2" r=".6" fill="#fff"/>
    <circle cx="20.5" cy="35" r="2.6" fill="#f2a39b" opacity=".55"/><circle cx="43.5" cy="35" r="2.6" fill="#f2a39b" opacity=".55"/>
    <path d="M28.5 36.5 Q32 39.5 35.5 36.5" stroke="#b06a52" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </svg>`;
  const DOG_SVG = `<svg class="dogsvg" viewBox="0 0 56 46">
    <path class="dog-tail" d="M9 25 C2 23 0 14 5 10 C7 16 10 21 13 25 Z" fill="#ece2d2"/>
    <ellipse cx="27" cy="28" rx="17" ry="11.5" fill="#f4ede1"/>
    <g class="dog-legB"><rect x="17" y="33" width="5" height="11" rx="2.5" fill="#e3d8c5"/></g>
    <rect x="22" y="35" width="5" height="9" rx="2.5" fill="#e3d8c5"/>
    <rect x="33" y="35" width="5" height="9" rx="2.5" fill="#f4ede1"/>
    <g class="dog-legF"><rect x="38" y="33" width="5" height="11" rx="2.5" fill="#f4ede1"/></g>
    <ellipse cx="32" cy="14" rx="4" ry="6.5" fill="#e0d3bd" transform="rotate(-22 32 14)"/>
    <ellipse cx="48" cy="14" rx="4" ry="6.5" fill="#e0d3bd" transform="rotate(22 48 14)"/>
    <circle cx="40" cy="18" r="10.5" fill="#f7f0e6"/>
    <circle cx="36.5" cy="17.5" r="1.4" fill="#2a1d18"/><circle cx="43.5" cy="17.5" r="1.4" fill="#2a1d18"/>
    <ellipse cx="40" cy="21.5" rx="1.8" ry="1.3" fill="#3a2a22"/>
    <path d="M40 22.8 v2.2" stroke="#9a8472" stroke-width="1" stroke-linecap="round"/>
    <path d="M37.5 25 Q40 27 42.5 25" stroke="#9a8472" stroke-width="1" fill="none" stroke-linecap="round"/>
  </svg>`;
  const CAMP_SVG = `<svg viewBox="0 0 230 150">
    <path d="M118 124 L162 48 L206 124Z" fill="#6f9fb8"/>
    <path d="M162 48 L206 124 L188 124 L162 64Z" fill="#577f97"/>
    <path d="M150 124 L162 80 L174 124Z" fill="#38566a"/>
    <path d="M162 48 L167 44 L210 120 L206 124Z" fill="#cdb089"/>
    <circle cx="167" cy="46" r="3" fill="#e8c857"/>
    <rect x="14" y="112" width="64" height="15" rx="7.5" fill="#7a5536"/>
    <ellipse cx="16" cy="119.5" rx="6.5" ry="7.5" fill="#a07a4f"/><ellipse cx="16" cy="119.5" rx="3" ry="3.5" fill="#7a5536"/>
    <ellipse cx="84" cy="126" rx="6" ry="3.5" fill="#9b9b9b"/><ellipse cx="120" cy="126" rx="6" ry="3.5" fill="#8f8f8f"/>
    <g transform="translate(102,116)">
      <rect x="-15" y="6" width="30" height="6" rx="3" fill="#5a4632"/>
      <rect x="-13" y="3" width="28" height="6" rx="3" fill="#6f553a" transform="rotate(14)"/>
      <path class="cfire-flame" d="M0 6 C-11 -4 -9 -16 0 -26 C9 -16 11 -4 0 6Z" fill="#ff8a3c"/>
      <path class="cfire-flame b" d="M0 3 C-6 -3 -5 -11 0 -18 C5 -11 6 -3 0 3Z" fill="#ffd76b"/>
    </g>
  </svg>`;

  /* THEME */
  function initTheme() {
    const root = document.documentElement, btn = document.getElementById("themeToggle");
    function set(t){ root.setAttribute("data-theme", t); localStorage.setItem("ps-theme", t); if (hasGSAP) setTimeout(()=>ScrollTrigger.refresh(), 60); }
    if (btn) btn.addEventListener("click", () => set(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));
  }

  /* LOADER */
  function runLoader(done) {
    const loader = document.getElementById("loader"), bar = document.getElementById("loaderBar"),
      pct = document.getElementById("loaderPct"), letters = loader ? loader.querySelectorAll(".loader__name span") : [];
    if (!loader || reduce || !hasGSAP) { if (loader) loader.style.display = "none"; done(); return; }
    gsap.to(letters, { opacity: 1, y: 0, duration: .7, stagger: .05, ease: "power3.out" });
    const s = { v: 0 };
    gsap.to(s, { v: 100, duration: 1.4, ease: "power1.inOut", delay: .3,
      onUpdate(){ const n = Math.round(s.v); if (bar) bar.style.width = n + "%"; if (pct) pct.textContent = String(n).padStart(2,"0"); },
      onComplete(){ gsap.to(loader, { yPercent: -100, duration: 1, ease: "power4.inOut", delay: .1, onStart: done, onComplete(){ loader.style.display = "none"; } }); } });
  }

  /* LENIS */
  function initLenis() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    if (hasGSAP) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(); }
  }
  function scrollTo(target) {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    let y = 0;
    if (target !== "hero") {
      // pinned sections: jump to the pin's start so its scroll-effect plays from the beginning
      const st = hasGSAP ? ScrollTrigger.getAll().find((s) => s.trigger === el && s.pin) : null;
      y = st ? st.start + 2 : el.getBoundingClientRect().top + window.scrollY;
    }
    if (lenis) lenis.scrollTo(y, { duration: 1.4 }); else window.scrollTo(0, y);
  }

  /* CURSOR */
  function initCursor() {
    if (!isDesktop) return;
    const cursor = document.getElementById("cursor"), dot = cursor.querySelector(".cursor__dot"),
      ring = cursor.querySelector(".cursor__ring"), label = document.getElementById("cursorLabel");
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
    const flies = [document.getElementById("cursorFly1"), document.getElementById("cursorFly2")].filter(Boolean)
      .map((el, i) => ({ el, x: mx, y: my, lag: 0.085 - i * 0.03, ph: i * 2.3, amp: 13 + i * 9 }));
    let ft = 0;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx+"px"; dot.style.top = my+"px";
      document.documentElement.style.setProperty("--mx", (mx/innerWidth)*100+"%"); document.documentElement.style.setProperty("--my", (my/innerHeight)*100+"%"); });
    (function loop(){
      rx += (mx-rx)*.18; ry += (my-ry)*.18; ring.style.left = rx+"px"; ring.style.top = ry+"px"; label.style.left = rx+"px"; label.style.top = ry+"px";
      ft += 0.028;
      flies.forEach((f) => { f.x += (mx - f.x) * f.lag; f.y += (my - f.y) * f.lag;
        f.el.style.left = (f.x + Math.sin(ft*1.3 + f.ph) * f.amp) + "px";
        f.el.style.top  = (f.y + Math.cos(ft*1.1 + f.ph) * f.amp) + "px"; });
      requestAnimationFrame(loop);
    })();
    addEventListener("mousedown", () => cursor.classList.add("is-down"));
    addEventListener("mouseup", () => cursor.classList.remove("is-down"));
    function bind(el){
      el.addEventListener("mouseenter", () => { const t = el.getAttribute("data-cursor"); if (t){ cursor.classList.add("is-label"); label.textContent = t; } else cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", () => { cursor.classList.remove("is-hover","is-label"); label.textContent = ""; });
    }
    document.querySelectorAll("a, button, [data-cursor], .ric, .folder, input").forEach(bind);
    cursorAPI = { bind };
  }

  /* ICON RAIL */
  function initRail() {
    const rics = [...document.querySelectorAll(".ric")], progress = document.getElementById("scrollProgress");
    document.querySelectorAll("[data-scroll-to]").forEach((el) => el.addEventListener("click", () => scrollTo(el.getAttribute("data-scroll-to"))));
    rics.forEach((r) => r.querySelector("button").addEventListener("click", () => scrollTo(r.getAttribute("data-target"))));
    const sections = [...document.querySelectorAll("section[data-stage]")];
    const absTop = (el) => { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; };
    function onScroll() {
      const y = scrollY + innerHeight*.42; let active = "hero";
      const docH = document.body.scrollHeight - innerHeight;
      if (progress) progress.style.width = Math.min(100, (scrollY/docH)*100)+"%";
      sections.forEach((sec) => { if (absTop(sec) <= y) active = sec.getAttribute("data-stage"); });
      rics.forEach((r) => r.classList.toggle("is-active", r.getAttribute("data-target") === active));
    }
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* HERO — door split */
  function initHero() {
    if (!hasGSAP || reduce) return;
    gsap.from(".hero__name", { yPercent: 24, opacity: 0, duration: 1.1, ease: "power3.out", delay: .15 });
    gsap.from(".hero__kicker, .hero__row", { opacity: 0, y: 20, duration: .8, stagger: .1, ease: "power2.out", delay: .5 });
    gsap.timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "+=115%", scrub: true, pin: true, anticipatePin: 1 } })
      .to(".hw-l", { xPercent: -170, ease: "power2.in" }, 0)
      .to(".hw-r", { xPercent: 170, ease: "power2.in" }, 0)
      .to(".hero__kicker, .hero__row", { opacity: 0, duration: .3 }, 0);
  }

  /* ABOUT bullets */
  function initAbout() {
    const about = document.getElementById("about");
    if (about) {
      if (hasGSAP) ScrollTrigger.create({ trigger: about, start: "top 68%", once: true, onEnter: () => about.classList.add("is-in") });
      else about.classList.add("is-in");
    }
    if (!hasGSAP || reduce) return;
    gsap.from(".about__h", { opacity: 0, y: 40, duration: 1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".about__h", start: "top 90%" } });
    gsap.from(".about__p, .about__label", { opacity: 0, y: 24, duration: .8, stagger: .1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".about__p", start: "top 92%" } });
    gsap.from("#about .about__bullets li", { opacity: 0, x: -30, duration: .7, stagger: .08, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".about__bullets", start: "top 95%" } });
    gsap.from(".about__media", { opacity: 0, y: 40, scale: .96, duration: 1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".about__media", start: "top 90%" } });
  }

  /* FUN FACTS — semicircle motion-path sequence (bottom-right → centre → bottom-right) */
  function initFacts() {
    const stage = document.getElementById("factsStage");
    if (!stage) return;
    const cards = [...stage.querySelectorAll(".fcard")];
    if (!hasGSAP || reduce || !isDesktop) { cards.forEach((c) => c.style.opacity = 1); return; }
    // Reverse-U arch conveyor: cards sit along a single ∩ arch (peak card biggest),
    // a fan that flows from the bottom-right corner → peak → bottom-left as you scroll.
    const N = cards.length;
    const R = Math.min(660, innerWidth * 0.42);
    const BASE = Math.min(250, innerHeight * 0.28);
    const PEAK = Math.min(210, innerHeight * 0.23);
    const minS = 0.5, maxS = 1.0, SPACING = 0.16;
    const TRAVEL = 1 + N * SPACING;
    function setCard(card, t) {
      if (t < -0.08 || t > 1.08) { card.style.opacity = 0; return; }
      const tc = Math.min(1, Math.max(0, t)), a = Math.PI * tc;
      let op = 1;
      if (t < 0.05) op = Math.max(0, (t + 0.08) / 0.13);
      else if (t > 0.95) op = Math.max(0, (1.08 - t) / 0.13);
      gsap.set(card, { x: R * Math.cos(a), y: BASE - (BASE + PEAK) * Math.sin(a),
        scale: minS + (maxS - minS) * Math.sin(a), rotation: (0.5 - tc) * 22,
        opacity: op, zIndex: Math.round(Math.sin(a) * 100) });
    }
    ScrollTrigger.create({ trigger: "#facts", start: "top top", end: "+=" + (N * 50) + "%", pin: true, scrub: 1, anticipatePin: 1,
      onUpdate(self) { const S = self.progress * TRAVEL; cards.forEach((card, i) => setCard(card, S - i * SPACING)); } });
    cards.forEach((card, i) => setCard(card, -i * SPACING));
  }

  /* FILE WINDOW modal */
  function initModal() {
    const win = document.getElementById("fileWin"), close = document.getElementById("fileClose"),
      nameEl = document.getElementById("fileWinName"), body = document.getElementById("fileBody");
    if (!win) return;
    const names = { deconstruct: "Deconstruct", oreo: "Oreo", turban: "Turban", mokobara: "Mokobara", jacquemus: "Jacquemus" };
    window.openCase = function (key) {
      win.querySelectorAll(".casepanel").forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-panel") === key));
      if (nameEl) nameEl.textContent = (names[key] || key) + " — case study";
      win.classList.add("is-open"); win.setAttribute("aria-hidden", "false"); body.scrollTop = 0; modalOpen = true;
      if (lenis) lenis.stop(); document.body.style.overflow = "hidden";
      const panel = win.querySelector(".casepanel.is-active");
      if (hasGSAP && !reduce && panel) gsap.fromTo(panel.children, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: .6, stagger: .04, ease: "power3.out", delay: .25 });
      countUp(panel);
    };
    function closeCase(){ win.classList.remove("is-open"); win.setAttribute("aria-hidden", "true"); modalOpen = false; if (lenis) lenis.start(); document.body.style.overflow = ""; }
    close.addEventListener("click", closeCase);
    addEventListener("keydown", (e) => { if (e.key === "Escape" && modalOpen) closeCase(); });
    document.querySelectorAll(".pcard").forEach((f) => f.addEventListener("click", () => window.openCase(f.getAttribute("data-case"))));
    if (cursorAPI) win.querySelectorAll("a,button,[data-cursor],input").forEach(cursorAPI.bind);
  }

  /* PROJECTS reveal */
  function initProjects() {
    if (!hasGSAP || reduce) return;
    gsap.utils.toArray(".pcard").forEach((el, i) =>
      gsap.from(el, { opacity: 0, y: 40, duration: .7, ease: "power3.out", delay: i * .08, scrollTrigger: { trigger: ".projects__row", start: "top 88%" } }));
  }

  /* PROJECTS horizontal carousel */
  function initProjectsCarousel() {
    const row = document.getElementById("projectsRow"),
      prev = document.getElementById("projPrev"), next = document.getElementById("projNext");
    if (!row || !prev || !next) return;
    function step(){ const card = row.querySelector(".pcard"); const cs = getComputedStyle(row);
      const gap = parseFloat(cs.columnGap || cs.gap) || 12;
      return card ? card.getBoundingClientRect().width + gap : row.clientWidth * 0.8; }
    function update(){ const max = row.scrollWidth - row.clientWidth - 2;
      prev.classList.toggle("is-off", row.scrollLeft <= 2);
      next.classList.toggle("is-off", max <= 2 || row.scrollLeft >= max); }
    prev.addEventListener("click", () => row.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => row.scrollBy({ left:  step(), behavior: "smooth" }));
    row.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update); update();
  }

  /* SKILLS reveal */
  function initSkills() {
    if (!hasGSAP || reduce) return;
    gsap.utils.toArray(".skchips span").forEach((el, i) =>
      gsap.from(el, { opacity: 0, y: 18, scale: .9, duration: .5, ease: "back.out(1.6)", delay: (i % 8) * .04, scrollTrigger: { trigger: el, start: "top 95%" } }));
    gsap.utils.toArray(".tool").forEach((el, i) =>
      gsap.from(el, { opacity: 0, y: 30, duration: .6, ease: "power3.out", delay: i * .07, scrollTrigger: { trigger: ".tools", start: "top 88%" } }));
  }

  /* JOURNEY pixel walk */
  function initJourney() {
    const scene = document.getElementById("journeyScene"), world = document.getElementById("journeyWorld"),
      title = document.getElementById("journeyTitle"), girl = document.getElementById("girl"),
      milestones = [...document.querySelectorAll("#journeyWorld .milestone")];
    if (!scene || !world) return;
    if (girl) {
      const frames = []; for (let i = 1; i <= 20; i++) frames.push("assets/img/sprite/walk-" + String(i).padStart(2, "0") + ".png");
      girl.innerHTML = frames.map((s, i) => '<img class="spriteframe' + (i === 0 ? " on" : "") + '" src="' + s + '" alt="" />').join("");
      const imgs = girl.querySelectorAll(".spriteframe");
      let fi = 0;
      if (imgs.length) setInterval(() => { imgs[fi].classList.remove("on"); fi = (fi + 1) % imgs.length; imgs[fi].classList.add("on"); }, 60);
    }
    const dog = document.getElementById("dog"); if (dog) dog.innerHTML = DOG_SVG;
    const stars = document.getElementById("journeyStars");
    if (stars) for (let i = 0; i < 70; i++){ const s = document.createElement("i"); s.style.left = Math.random()*100+"%"; s.style.top = Math.random()*55+"%"; s.style.animationDelay = (Math.random()*3)+"s"; stars.appendChild(s); }
    milestones.forEach((m) => m.style.left = m.dataset.x + "%");
    // scatter props
    const treeXs = [6,21,40,57,72,88,98];
    treeXs.forEach((x) => { const e = document.createElement("div"); e.className = "tree"; e.innerHTML = "<i></i><b></b>"; e.style.left = x + "%"; world.appendChild(e); });
    [11,34,52,67,83,95].forEach((x) => { const e = document.createElement("div"); e.className = "bush"; e.style.left = x + "%"; world.appendChild(e); });
    const flCols = ["#f2a6c0","#f6c453","#e88ab0","#a9c7ef","#f2a6c0"];
    [9,17,26,37,49,58,70,81,90,96].forEach((x,i) => { const e = document.createElement("div"); e.className = "flower"; e.style.left = x + "%"; e.style.setProperty("--fl", flCols[i%flCols.length]); world.appendChild(e); });
    [23,55,86].forEach((x) => { const e = document.createElement("div"); e.className = "mushroom"; e.style.left = x + "%"; world.appendChild(e); });
    [19,47,75].forEach((x) => { const e = document.createElement("div"); e.className = "lantern"; e.innerHTML = "<i></i>"; e.style.left = x + "%"; world.appendChild(e); });
    for (let i = 0; i < 12; i++){ const f = document.createElement("div"); f.className = "firefly"; f.style.left = (Math.random()*100)+"%"; f.style.bottom = (20 + Math.random()*30)+"%"; f.style.animationDelay = (Math.random()*6)+"s"; world.appendChild(f); }
    for (let i = 0; i < 3; i++){ const b = document.createElement("div"); b.className = "critter bird"; b.style.animationDelay = (i*3)+"s"; scene.appendChild(b); }

    // On narrow screens stretch the world so milestones keep breathing room,
    // and line the sprite/sign check up with the girl's CSS position (50% on mobile, 46% desktop).
    const W = notMobile ? 1 : 2.4, CENTER = notMobile ? 0.46 : 0.5;
    if (!notMobile) world.style.width = (W * 100) + "%";
    function place(tx){
      world.style.transform = `translateX(${tx*100}vw)`;
      let near = null, best = 1;
      milestones.forEach((m) => { const sx = (parseFloat(m.dataset.x)/100)*W + tx; const d = Math.abs(sx - CENTER);
        m.classList.toggle("is-near", d < 0.09); if (d < best){ best = d; near = m; } });
      if (near && best < 0.13 && title){ const h = near.querySelector("h4"); if (h && title.textContent !== h.textContent) title.textContent = h.textContent; }
    }
    // Derive travel from the actual first/last milestone so the walk starts on the first
    // and ends centred on the last, whatever the world width or milestone count.
    const xs = milestones.map((m) => parseFloat(m.dataset.x) / 100);
    const firstX = xs.length ? Math.min(...xs) : 0.13, lastX = xs.length ? Math.max(...xs) : 1.05;
    const startTx = CENTER - firstX * W;   // first milestone at the sprite
    const endTx = CENTER - lastX * W;      // last milestone at the sprite
    if (hasGSAP && !reduce) {
      ScrollTrigger.create({ trigger: "#journey", start: "top top", end: "+=" + (notMobile ? 280 : 460) + "%", pin: true, scrub: 1, anticipatePin: 1,
        onUpdate(self){ place(startTx + self.progress * (endTx - startTx)); } });
      place(startTx);
    } else { place(-0.1); }
  }

  /* CAMP */
  function initCamp() {
    const stars = document.getElementById("campStars");
    if (stars) for (let i = 0; i < 55; i++){ const s = document.createElement("i"); s.style.left = Math.random()*100+"%"; s.style.top = Math.random()*60+"%"; s.style.animationDelay = (Math.random()*3)+"s"; stars.appendChild(s); }
    const svg = document.querySelector(".camp__scene-svg");
    if (svg) svg.innerHTML = CAMP_SVG;
    const sprite = document.getElementById("campSprite");
    if (sprite) {
      const idle = []; for (let i = 1; i <= 16; i++) idle.push("assets/img/sprite/idle-" + String(i).padStart(2, "0") + ".png");
      sprite.innerHTML = idle.map((s, i) => '<img class="spriteframe' + (i === 0 ? " on" : "") + '" src="' + s + '" alt="" />').join("");
      const imgs = sprite.querySelectorAll(".spriteframe");
      let ci = 0;
      if (imgs.length) setInterval(() => { imgs[ci].classList.remove("on"); ci = (ci + 1) % imgs.length; imgs[ci].classList.add("on"); }, 120);
    }
  }

  /* MAGNETIC */
  function initMagnetic() {
    if (!isDesktop || !hasGSAP) return;
    document.querySelectorAll(".rail__theme button, .contact__top, .reportcard__btn, .topbar__brand, .filewin__close").forEach((el) => {
      el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX-(r.left+r.width/2))*.25, y: (e.clientY-(r.top+r.height/2))*.25, duration: .5, ease: "power3.out" }); });
      el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)" }));
    });
  }

  /* COUNT-UP */
  function countUp(scope) {
    (scope || document).querySelectorAll("[data-count]:not(.counted)").forEach((el) => {
      el.classList.add("counted");
      const end = parseFloat(el.dataset.count), plain = el.dataset.plain === "true", o = { v: 0 };
      if (!hasGSAP || reduce) { el.innerHTML = (el.dataset.prefix||"") + end + (el.dataset.suffix||""); return; }
      gsap.to(o, { v: end, duration: 1.5, ease: "power2.out",
        onUpdate(){ const nn = plain ? Math.round(o.v) : Math.round(o.v).toLocaleString("en-IN"); el.innerHTML = (el.dataset.prefix||"") + nn + (el.dataset.suffix||""); } });
    });
  }

  /* REPORT CARD */
  function initReportCard() {
    const rows = document.getElementById("rcRows"), overall = document.getElementById("rcOverall"),
      roll = document.getElementById("rcRoll"), nameInput = document.getElementById("rcName"), dateEl = document.getElementById("rcDate");
    if (!rows || !roll) return;
    const grades = ["A+","A","B+","B","C","A++"], value = { "A++":5,"A+":4.5,"A":4,"B+":3.5,"B":3,"C":2 };
    const gradeFor = (a) => a>=4.4?"A+":a>=3.9?"A":a>=3.4?"B+":a>=2.8?"B":"C";
    roll.addEventListener("click", () => {
      let sum = 0; const lis = rows.querySelectorAll("li");
      lis.forEach((li) => { const g = grades[Math.floor(Math.random()*grades.length)], b = li.querySelector("b"); b.textContent = g; sum += value[g]||3;
        if (hasGSAP && !reduce) gsap.fromTo(b, { scale:.4, opacity:0 }, { scale:1, opacity:1, duration:.5, ease:"back.out(2)" }); });
      overall.textContent = gradeFor(sum/lis.length);
      if (hasGSAP && !reduce) gsap.fromTo(overall, { rotate:-20, scale:.5 }, { rotate:0, scale:1, duration:.6, ease:"back.out(2.2)" });
    });
    if (dateEl) dateEl.textContent = "Date — " + new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"2-digit", year:"2-digit" });
    if (nameInput) nameInput.addEventListener("focus", () => { if (lenis && !modalOpen) lenis.stop(); });
  }

  function step(name, fn){ try { fn(); } catch (e) { console.error("INIT FAIL @ " + name + ": " + (e && e.message) + "\n" + (e && e.stack)); } }
  function init() {
    step("theme",initTheme); step("lenis",initLenis); step("rail",initRail); step("cursor",initCursor); step("magnetic",initMagnetic);
    step("hero",initHero); step("about",initAbout); step("facts",initFacts); step("modal",initModal); step("projects",initProjects); step("projectsCarousel",initProjectsCarousel); step("skills",initSkills);
    step("journey",initJourney); step("camp",initCamp); step("reportcard",initReportCard);
    if (hasGSAP) { ScrollTrigger.refresh(); setTimeout(() => ScrollTrigger.refresh(), 500); }
  }
  (function(){ const saved = localStorage.getItem("ps-theme"); if (saved) document.documentElement.setAttribute("data-theme", saved); })();
  addEventListener("load", () => runLoader(init));
})();
