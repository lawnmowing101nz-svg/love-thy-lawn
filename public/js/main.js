(function(){
  var FORMSPARK_URL = "https://submit-form.com/bDrIRB60c";

  // Cold-pitch spam blocklist. The live list is shared across every site and
  // loaded by the script tag in the HTML; this copy is the fallback for when
  // that request fails, so the form is never left unprotected.
  var SPAM_KEYWORDS_FALLBACK = [
      "b2b",
      "seo",
      "backlink",
      "link building",
      "domain authority",
      "organic traffic",
      "keyword ranking",
      "serp",
      "guest post",
      "ahrefs",
      "semrush",
      "moz",
      "web design",
      "website redesign",
      "web development",
      "app development",
      "wordpress",
      "shopify",
      "full-stack",
      "devops",
      "mvp",
      "hire developers",
      "staff augmentation",
      "offshore",
      "virtual assistant",
      "ai automation",
      "ai agent",
      "ai assistant",
      "ai-powered",
      "ai-native",
      "ai video",
      "artificial intelligence",
      "generative",
      "chatgpt",
      "chatbot",
      "automate your",
      "automation",
      "crm",
      "saas",
      "lead generation",
      "qualified leads",
      "cold email",
      "mass email",
      "bulk email",
      "email campaign",
      "google my business",
      "gmb",
      "local seo",
      "google maps ranking",
      "online presence",
      "reputation management",
      "social media management",
      "facebook ads",
      "google ads",
      "meta ads",
      "ppc",
      "retargeting",
      "digital marketing",
      "marketing agency",
      "content marketing",
      "press release",
      "brand awareness",
      "branding package",
      "logo design",
      "video production",
      "explainer video",
      "voiceover",
      "influencer",
      "free audit",
      "seo audit",
      "conversion rate",
      "sales funnel",
      "monetize",
      "monetise",
      "your roi",
      "scale your business",
      "grow your business",
      "business loan",
      "merchant cash",
      "invoice factoring",
      "crypto",
      "bitcoin",
      "forex",
      "investment opportunity",
      "passive income",
      "make money online",
      "affiliate",
      "you've been selected",
      "congratulations you",
      "click here",
      "risk-free",
      "free trial",
      "limited time offer",
      "act now",
      "unsubscribe",
      "gift card",
      "wire transfer",
      "linkedin",
      "calendly",
      "calendar.app",
      "tidycal",
      "savvycal",
      "hubspot",
      "telegram",
      "book a call",
      "brief call",
      "hop on a call",
      "jump on a call",
      "discovery call",
      "book a demo",
      "15 minutes of your",
      "30 minutes of your",
      "worth a chat",
      "worth a conversation",
      "sounds relevant",
      "let's connect",
      "circling back",
      "touching base",
      "who handles your",
      "are you the right person",
      "we specialize",
      "we specialise",
      "our team handles",
      "we work with agencies",
      "full production",
      "end-to-end",
      "turnkey",
      "white label",
      "white-label",
      "proof of concept",
      "proof-of-concept",
      "case study",
      "case studies",
      "our recent work",
      "our latest work",
      "cofounder",
      "co-founder",
      "business development manager",
      "sales representative",
      "partnership",
      "collaboration",
      "synergy",
      "win-win",
      "mutual benefit",
      "dear sir",
      "dear madam"
    ];

  // Read at submit time, not at load, so it does not matter whether the
  // shared list has arrived yet when this file runs.
  function spamKeywords() {
    return (window.SPAM_KEYWORDS && window.SPAM_KEYWORDS.length)
      ? window.SPAM_KEYWORDS
      : SPAM_KEYWORDS_FALLBACK;
  }

  function isSpamMessage(text) {
    var lower = (text || "").toLowerCase();
    return spamKeywords().some(function (kw) { return lower.indexOf(kw) !== -1; });
  }

  // Drop-in for fetch() on the Formspark call. A spam message is never sent,
  // but resolves exactly as a success would, so the sender cannot tell they
  // were filtered and reword it.
  function spamGuardedFetch(url, opts) {
    var text = "";
    try {
      var b = opts && opts.body;
      if (b && typeof b.get === "function") {
        var keys = ["Message", "message", "Comments", "comments", "Enquiry", "enquiry", "Details", "details", "Notes", "notes"];
        for (var i = 0; i < keys.length && !text; i++) text = b.get(keys[i]) || "";
        // Unrecognised field name: fall back to the longest value, which on a
        // contact form is the free-text message, never the name or phone.
        if (!text && typeof b.forEach === "function") {
          b.forEach(function (v) { v = String(v || ""); if (v.length > text.length) text = v; });
        }
      } else if (typeof b === "string") {
        text = decodeURIComponent(b.replace(/\+/g, " "));
      }
    } catch (e) {}
    if (isSpamMessage(text)) {
      return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve({}); } });
    }
    return fetch(url, opts);
  }


  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function(){
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ mainNav.classList.remove("open"); });
    });
  }

  // Chat widget toggle
  var chatToggle = document.querySelector(".chat-toggle");
  var chatPanel = document.querySelector(".chat-panel");
  if (chatToggle && chatPanel) {
    chatToggle.addEventListener("click", function(){
      var isOpen = chatPanel.classList.toggle("open");
      chatToggle.classList.toggle("open", isOpen);
      chatToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Gallery lightbox
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery-grid img").forEach(function(img){
      img.addEventListener("click", function(){
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", function(){
      lightbox.classList.remove("open");
    });
  }

  // Generic Formspark submit handler
  function wireForm(formEl){
    if (!formEl) return;
    var errorEl = formEl.querySelector(".form-error");
    var submitBtn = formEl.querySelector("button[type=submit]");

    formEl.addEventListener("submit", function(e){
      e.preventDefault();
      if (errorEl) { errorEl.classList.remove("show"); errorEl.textContent = ""; }
      var formData = new FormData(formEl);
      var params = new URLSearchParams();
      formData.forEach(function(value, key){ params.append(key, value); });

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

      spamGuardedFetch(FORMSPARK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: params.toString()
      }).then(function(res){
        if (!res.ok) throw new Error("Submission failed");
        var wrap = formEl.closest(".form-wrap") || formEl.parentElement;
        var success = wrap.querySelector(".form-success");
        formEl.style.display = "none";
        if (success) success.classList.add("show");
      }).catch(function(){
        if (errorEl) {
          errorEl.textContent = "Something went wrong sending that. Please call us on 021 178 9897 instead.";
          errorEl.classList.add("show");
        }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send Message"; }
      });
    });
  }

  wireForm(document.querySelector("#contact-form"));
  wireForm(document.querySelector("#chat-form"));

  // Scroll-reveal animations
  var groupSelectors = ".grid-3, .grid-2, .why-grid, .gallery-grid, .trust-grid, .about-hero, .contact-grid";
  var singleSelectors = ".section-head, .cta-band .container, .review-card";

  document.querySelectorAll(groupSelectors).forEach(function(el){ el.classList.add("reveal-group"); });
  document.querySelectorAll(singleSelectors).forEach(function(el){
    if (!el.closest(".grid-3, .grid-2")) el.classList.add("reveal");
  });

  var revealEls = document.querySelectorAll(".reveal, .reveal-group");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in-view"); });
  }
})();

/* Live "X/300" counter — auto-attaches to every textarea[maxlength], so any
   future form gets one just by adding the attribute. */
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("textarea[maxlength]").forEach(function(ta){
      if (ta.nextElementSibling && ta.nextElementSibling.className === "char-count") return;
      var max = ta.getAttribute("maxlength");
      var counter = document.createElement("div");
      counter.className = "char-count";
      ta.parentNode.insertBefore(counter, ta.nextSibling);
      function update(){ counter.textContent = ta.value.length + "/" + max; }
      ta.addEventListener("input", update);
      update();
    });
  });
})();
