(function(){
  var FORMSPARK_URL = "https://submit-form.com/bDrIRB60c";

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

      fetch(FORMSPARK_URL, {
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
