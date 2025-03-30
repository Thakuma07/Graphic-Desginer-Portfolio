document.addEventListener("DOMContentLoaded", function () {
  // Hide scrollbars during initial animation
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Create and animate the overlay
  var overlay = document.createElement("div");
  overlay.id = "pageOverlay";
  document.body.appendChild(overlay);

  gsap.to("#pageOverlay", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: function () {
      document.body.removeChild(overlay);
      
      // Restore scrollbars after animation
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      // Animate the bounding elements
      document.querySelectorAll(".boundingelem").forEach(elem => {
        elem.style.animation = "slideDown 1s ease-out forwards";
      });

      // Initialize Locomotive Scroll after animations complete
      initLocomotiveScroll();
    }
  });

  // Initialize mouse follower circle
  circleChaptaKaro();
  circleMouseFollower();

  // Set up hover effects for portfolio items
  setupPortfolioHover();
});

function initLocomotiveScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

var timeout;

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

function setupPortfolioHover() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });

    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
}