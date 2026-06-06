/* ============================================================
   PRERIKA SINGH — Portfolio v5 interactions
   ============================================================ */
(function () {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = matchMedia("(min-width: 901px)").matches;
  const notMobile = matchMedia("(min-width: 761px)").matches;
  const hasGSAP = typeof gsap !== "undefined";
  if (hasGSAP && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
  let lenis = null, cursorAPI = null, modalOpen = false;

  /* ---- SVG ART ---- */
  const GIRL_SVG = `<svg class="girlsvg" viewBox="0 0 64 100">
    <path class="gs-hairb" d="M13 30C12 13 52 13 51 30 55 51 53 73 46 83 45 72 45 60 44 51 44 62 43 75 40 83 39 72 39 60 38 51 37 64 35 77 32 85 29 77 27 64 26 51 25 60 25 73 24 83 21 75 20 62 20 51 19 60 19 73 18 83 11 72 9 50 13 30Z" fill="#241a16"/>
    <g class="gs-legB"><rect x="30" y="64" width="7" height="23" rx="3.5" fill="#cf9466"/><path d="M29 85h10l1 8H28z" fill="#46352a"/></g>
    <g class="gs-armB"><rect x="16" y="47" width="6" height="19" rx="3" fill="#cf9466"/></g>
    <path d="M20 47C24 42 40 42 44 47L49 73H15Z" fill="#E8C857"/>
    <path d="M28 46h8v6h-8z" fill="#f3d9b0"/>
    <path d="M27 50h10l-1 22h-8z" fill="#f7efe1"/>
    <g class="gs-legF"><rect x="27" y="64" width="7" height="23" rx="3.5" fill="#eeb079"/><path d="M26 85h10l1 8H25z" fill="#5b4632"/></g>
    <g class="gs-armF"><rect x="42" y="47" width="6" height="19" rx="3" fill="#eeb079"/></g>
    <circle cx="32" cy="28" r="16" fill="#f3cda3"/>
    <circle cx="16.5" cy="30" r="2.4" fill="#edbd91"/><circle cx="47.5" cy="30" r="2.4" fill="#edbd91"/>
    <ellipse cx="25.5" cy="29" rx="1.8" ry="2.2" fill="#2a1d18"/><ellipse cx="38.5" cy="29" rx="1.8" ry="2.2" fill="#2a1d18"/>
    <circle cx="26.2" cy="28.3" r=".55" fill="#fff"/><circle cx="39.2" cy="28.3" r=".55" fill="#fff"/>
    <path d="M28.5 34.5Q32 37.5 35.5 34.5" stroke="#b06a52" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <circle cx="21" cy="33.5" r="2.7" fill="#f3a39c" opacity=".5"/><circle cx="43" cy="33.5" r="2.7" fill="#f3a39c" opacity=".5"/>
    <path class="gs-hairf" d="M14 31 C12 7 52 7 50 31 C50 18 44 14 39 16 C38 9 26 9 25 16 C20 14 14 18 14 31 Z" fill="#241a16"/>
    <path d="M16 30 C15 20 17 13 21 11 C18 19 18 26 19 31 Z" fill="#2f211b"/>
    <path d="M48 30 C49 20 47 13 43 11 C46 19 46 26 45 31 Z" fill="#2f211b"/>
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
    <line x1="56" y1="96" x2="92" y2="104" stroke="#8a6d4a" stroke-width="2" stroke-linecap="round"/>
    <circle cx="94" cy="104.5" r="3.2" fill="#fff3da"/>
    <g transform="translate(26,72)">
      <path d="M3 8 Q16 -7 29 8 Q31 26 24 34 L8 34 Q1 26 3 8Z" fill="#241a16"/>
      <path d="M7 20 Q16 15 25 20 L28 40 L4 40Z" fill="#E8C857"/>
      <rect x="6" y="36" width="22" height="7" rx="3.5" fill="#eeb079"/>
      <rect x="22" y="40" width="9" height="6" rx="3" fill="#5b4632"/>
      <circle cx="16" cy="13" r="10" fill="#f3cda3"/>
      <ellipse cx="13" cy="13" rx="1.3" ry="1.6" fill="#2a1d18"/><ellipse cx="19" cy="13" rx="1.3" ry="1.6" fill="#2a1d18"/>
      <path d="M14 16.5 Q16 18 18 16.5" stroke="#b06a52" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <circle cx="10.5" cy="15.5" r="1.8" fill="#f3a39c" opacity=".5"/><circle cx="21.5" cy="15.5" r="1.8" fill="#f3a39c" opacity=".5"/>
      <path d="M5 13 Q5 0 16 0 Q27 0 27 13 Q22 6 16 7 Q10 6 5 13Z" fill="#241a16"/>
      <rect x="24" y="20" width="4.5" height="14" rx="2.25" fill="#eeb079" transform="rotate(-32 26 27)"/>
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
      .to(".hname--l", { xPercent: -118, ease: "power2.in" }, 0)
      .to(".hname--r", { xPercent: 118, ease: "power2.in" }, 0)
      .to(".hero__kicker, .hero__row", { opacity: 0, duration: .3 }, 0);
  }

  /* ABOUT bullets */
  function initAbout() {
    if (!hasGSAP || reduce) return;
    gsap.from(".about__lead", { opacity: 0, y: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about__lead", start: "top 85%" } });
    gsap.utils.toArray("#aboutBullets li").forEach((li) => {
      gsap.from(li, { opacity: 0, x: -40, duration: .8, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 90%" } });
      gsap.from(li.querySelector(".tx"), { clipPath: "inset(0 100% 0 0)", duration: .9, ease: "power3.out", delay: .1, scrollTrigger: { trigger: li, start: "top 90%" } });
    });
  }

  /* FUN FACTS — scroll swirl sequence */
  function initFacts() {
    const stage = document.getElementById("factsStage");
    if (!stage) return;
    const cards = [...stage.querySelectorAll(".fcard")];
    if (!hasGSAP || reduce || !notMobile) { cards.forEach((c) => c.style.opacity = 1); return; }
    const ins = [{x:-150,y:70,r:-32},{x:150,y:-70,r:34},{x:-130,y:-80,r:26},{x:150,y:70,r:-28},{x:-150,y:50,r:36},{x:140,y:-70,r:-30}];
    const tl = gsap.timeline({ scrollTrigger: { trigger: "#facts", start: "top top", end: "+=" + (cards.length * 95) + "%", pin: true, scrub: 1, anticipatePin: 1 } });
    cards.forEach((card, i) => {
      const d = ins[i % ins.length];
      gsap.set(card, { xPercent: d.x, yPercent: d.y, rotation: d.r, scale: .35, opacity: 0 });
      tl.to(card, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out" })
        .to(card, {}, "+=0.4")
        .to(card, { xPercent: -d.x, yPercent: -d.y, rotation: -d.r, scale: .35, opacity: 0, duration: 1, ease: "power3.in" });
    });
  }

  /* FILE WINDOW modal */
  function initModal() {
    const win = document.getElementById("fileWin"), close = document.getElementById("fileClose"),
      nameEl = document.getElementById("fileWinName"), body = document.getElementById("fileBody");
    if (!win) return;
    const names = { oreo: "Oreo", mokobara: "Mokobara", jacquemus: "Jacquemus" };
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
    document.querySelectorAll(".folder").forEach((f) => f.addEventListener("click", () => window.openCase(f.getAttribute("data-case"))));
    if (cursorAPI) win.querySelectorAll("a,button,[data-cursor],input").forEach(cursorAPI.bind);
  }

  /* FOLDERS open/close one-by-one on scroll */
  function initFolders() {
    const folders = [...document.querySelectorAll(".folder")];
    if (!folders.length || !hasGSAP || reduce) return;
    ScrollTrigger.create({ trigger: "#projects", start: "top 70%", end: "bottom 60%", scrub: true,
      onUpdate(self){ const idx = Math.min(folders.length - 1, Math.floor(self.progress * folders.length));
        folders.forEach((f,i) => f.classList.toggle("is-open", i === idx)); } });
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
    if (girl) girl.innerHTML = GIRL_SVG;
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

    function place(tx){
      world.style.transform = `translateX(${tx*100}vw)`;
      let near = null, best = 1;
      milestones.forEach((m) => { const sx = (parseFloat(m.dataset.x)/100) + tx; const d = Math.abs(sx - 0.46);
        m.classList.toggle("is-near", d < 0.09); if (d < best){ best = d; near = m; } });
      if (near && best < 0.13 && title){ const h = near.querySelector("h4"); if (h && title.textContent !== h.textContent) title.textContent = h.textContent; }
    }
    if (hasGSAP && !reduce && notMobile) {
      ScrollTrigger.create({ trigger: "#journey", start: "top top", end: "+=220%", pin: true, scrub: 1, anticipatePin: 1,
        onUpdate(self){ place(0.32 - self.progress * 1.2); } });
      place(0.32);
    } else { place(-0.2); }
  }

  /* CAMP */
  function initCamp() {
    const stars = document.getElementById("campStars");
    if (stars) for (let i = 0; i < 55; i++){ const s = document.createElement("i"); s.style.left = Math.random()*100+"%"; s.style.top = Math.random()*60+"%"; s.style.animationDelay = (Math.random()*3)+"s"; stars.appendChild(s); }
    const svg = document.querySelector(".camp__scene-svg");
    if (svg) svg.innerHTML = CAMP_SVG;
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
    step("hero",initHero); step("about",initAbout); step("facts",initFacts); step("modal",initModal); step("folders",initFolders); step("skills",initSkills);
    step("journey",initJourney); step("camp",initCamp); step("reportcard",initReportCard);
    if (hasGSAP) { ScrollTrigger.refresh(); setTimeout(() => ScrollTrigger.refresh(), 500); }
  }
  (function(){ const saved = localStorage.getItem("ps-theme"); if (saved) document.documentElement.setAttribute("data-theme", saved); })();
  addEventListener("load", () => runLoader(init));
})();
