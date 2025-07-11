window.addEventListener('load', () => {
  const lenis = new Lenis({
    wrapper: window,
    content: document.documentElement,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
  });

  const panels = document.querySelectorAll('.panel');
  let currentPanel = 0;
  let lenisEnabled = true;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Scroll to panel
  function goToPanel(index) {
    if(index < 0 || index >= panels.length || !lenisEnabled) return;

    lenisEnabled = false;
    currentPanel = index;

    lenis.scrollTo(panels[index]);

    const timeline = gsap.timeline({
      onComplete: () => {
        lenisEnabled = true;
      }
    })


    timeline.to({}, { duration: 1.3 });
  }

  Observer.create({
    target: window,
    type: 'wheel,touch,pointer',
    wheelSpeed: -1,
    onUp: () => goToPanel(currentPanel + 1),
    onDown: () => goToPanel(currentPanel - 1),
    tolerance: 10,
    preventDefault: true,
  });

  // Carousel
  const experienceSwiper2 = new Swiper('.swiper.experience-swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    centeredSlide: true,
    spaceBetween: 20,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    breakpoints: {
      760: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    }
  });

  const swiper = new Swiper('.swiper.news-swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    centeredSlide: true,
    spaceBetween: 20,
    slidesPerView: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  const categoriesSwiper = new Swiper('.categories-swiper-mobile', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    centeredSlide: true,
    spaceBetween: 50,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });


  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const targetEl = document.querySelector(`#${targetId}`);
      const panelArray = Array.from(panels);

      goToPanel(panelArray.indexOf(targetEl));
    });
  });

  document.querySelectorAll('.expand').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const dataTarget = link.getAttribute('data-target');
      const modal = document.querySelector('.modal-categories');
      modal.classList.add('open');
      gsap.to('.modal-categories.open', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      });

      document.querySelector('.modal-title').textContent = CATEGORY[dataTarget].title;
      document.querySelector('.modal-button').setAttribute('href', CATEGORY[dataTarget].link || '#');
      document.querySelector('.services').textContent = CATEGORY[dataTarget].services;
      document.querySelector('.product').innerHTML = `
        ${CATEGORY[dataTarget].products.map((product) => `
          <div class="product-item">
            <img src="${product.image}" alt="${product.text}" />
            <p>${product.text}</p>
          </div>
        `).join('')}
      `;

      return lenis.stop();
    });
  });

  document.querySelector('.button-close-modal').addEventListener('click', () => {
    document.querySelector('.modal-categories').classList.remove('open');

    gsap.to('.modal-categories', {
      opacity: 0,
      y: "100%",
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.2,
    });

      return lenis.start();
  });

  document.querySelector('.open-form').addEventListener('click', () => {
    document.querySelector('.modal-contact').classList.add('open');
    gsap.to('.modal-contact.open', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      });

      return lenis.stop();
  });

  document.querySelector('.close-modal-form').addEventListener('click', () => {
    document.querySelector('.modal-contact').classList.remove('open');

    gsap.to('.modal-contact', {
      opacity: 0,
      x: "-100%",
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.2,
    });

      return lenis.start();
  });

  // hero animation
    gsap.to(".company-hero", {
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
      yoyo: true,
    });

    gsap.from(".menu", {
      x: "5rem",
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
      yoyo: true,
    })

    document.querySelectorAll('.text-hero').forEach((text, index) => {
      gsap.to(text, {
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: index * 0.2,
      });
    });

  gsap.registerPlugin(ScrollTrigger, Observer);

  gsap.fromTo(".company-hero", { scale: 0.7 }, {
    scale: 1,
    duration: 1,
    ease: 'power2.out',
    delay: 0.5,
    yoyo: true,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top", // When top of hero hits top of viewport
      toggleActions: "play none none restart",
    },
    repeat: 0,
    markers: true
  });

  document.querySelectorAll('.text-hero').forEach((text, index) => {
    gsap.fromTo(text, { y: '-100%' }, {
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: index * 0.2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top", // When top of hero hits top of viewport
        toggleActions: "play none none restart",
      },
      repeat: 0,
      markers: true
    });
  });

  //category animation
  document.querySelectorAll('.category-list-title').forEach((item, index) => {
    gsap.fromTo(item, { opacity: 0, y: 50 }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'circ.out',
      delay: index * 0.2,
      scrollTrigger: {
        trigger: "#categories",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
      repeat: 0,
      markers: true
    });
  });


  document.querySelectorAll('.expand').forEach((item, index) => {
    gsap.fromTo(item, { scale: 0.5, z: 90 }, {
      z: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: index * 0.2,
      scrollTrigger: {
        trigger: "#categories",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
      repeat: 0,
      markers: true
    });
  });

  gsap.fromTo('.spin', { rotate: 0 }, {
    rotate: 360,
    duration: 0.7,
    ease: 'circ.out',
    scrollTrigger: {
      trigger: "#categories",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
    delay: 0.5
  });

  document.querySelectorAll('.bounce').forEach((item, index) => {
    gsap.fromTo(item, { y: -10 }, {
      y: 0,
      duration: 1,
      ease: 'bounce.out',
      scrollTrigger: {
        trigger: "#categories",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
      repeat: 0,
      delay: index * 0.7 + 0.3
    });
  });

  gsap.fromTo('.categories-text', { x: -30 }, {
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: "#categories",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
    delay: 0.5
  });

  //experience animation
  gsap.fromTo('.experience-title', { x: -30 }, {
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: "#experience",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
  });

  gsap.fromTo('.experience-subtitle', { x: 30 }, {
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: "#experience",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
  });

  // News animation
  document.querySelectorAll('.text-up').forEach((item, index) => {
    gsap.fromTo(item, { y: '100%' }, {
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: "#news",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
      repeat: 0,
      delay: index * 0.1 + 0.1
    });
  });

  gsap.fromTo('.subtitle-news', { opacity: 0, y: 30 }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: "#news",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
    delay: 0.4
  });

  // Contact Animation
  document.querySelectorAll('.bouncing-contact').forEach((item, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
    });
    tl.to(item, {
      y: -20,
      duration: 0.3,
      ease: "power1.in",
      delay: index * 0.15 + 0.5,
      })
    .to(item, {
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  gsap.fromTo('.contact-title', { opacity: 0 }, {
    opacity: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: "#contact",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart restart restart",
    },
    repeat: 0,
    delay: 0.2
  });

  gsap.to('.form-contact', {
    '--angle': 360,
    duration: 5,
    ease: 'none',
    repeat: -1,
    delay: 0.5,
    modifiers: {
      "--angle": gsap.utils.unitize(v => parseFloat(v) % 360) // keep value within 0–360deg
    }
  });

  //Info animation
  gsap.to('#info', {
    backgrund: '#4FD66C',
    background: 'radial-gradient(circle,rgba(98, 222, 125, 1) 0%, rgba(109, 181, 232, 1) 100%)',
    duration: 5,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: "#info",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart reserve restart",
    },
    repeat: 0,
    delay: 0.7
  });

  gsap.fromTo('#info-title',  { opacity: 0 }, {
    opacity: 1,
    duration: 5,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: "#info",
      start: "top center", // When top of hero hits top of viewport
      toggleActions: "restart restart reserve restart",
    },
    repeat: 0,
    delay: 0.5
  });

  document.querySelectorAll('.info-subtitle').forEach((item, index) => {
    gsap.fromTo(item, { opacity: '0' }, {
      opacity: 1,
      duration: 0.7,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: "#news",
        start: "top center", // When top of hero hits top of viewport
        toggleActions: "restart restart restart restart",
      },
      repeat: 0,
      delay: index * 0.1 + 0.1
    });
  });

});
