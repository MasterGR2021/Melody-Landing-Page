const openRegisterFormBtn = document.getElementById('open-register-form');
const tryForFree = document.getElementById('try-for-free');
const registerHere = document.getElementById('register-here');
const openLoginFormBtn = document.getElementById('open-login-form');
const loginHere = document.getElementById('login-here');

const closeRegisterFormBtn = document.getElementById('close-register-form');
const closeLoginFormBtn = document.getElementById('close-login-form');

const overlay = document.getElementById('overlay');
const registerOverlay = document.getElementById('register-overlay');
const loginOverlay = document.getElementById('login-overlay');

// operations
const operationsLink = document.querySelectorAll('.operation-link');

const openRegisterForm = function() {
    overlay.classList.add('open');
    registerOverlay.classList.add('open');
}
const openLoginForm = function() {
    overlay.classList.add('open');
    loginOverlay.classList.add('open');
}

const closeRegisterForm = function() {
    overlay.classList.remove('open');
    registerOverlay.classList.remove('open');
}
const closeLoginForm = function() {
    overlay.classList.remove('open');
    loginOverlay.classList.remove('open');
}

openRegisterFormBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openRegisterForm();
});
tryForFree.addEventListener('click', function(e) {
    e.preventDefault();
    openRegisterForm();
})
registerHere.addEventListener('click', function(e) {
    e.preventDefault();
    closeLoginForm();
    openRegisterForm();
})
openLoginFormBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openLoginForm();
})
loginHere.addEventListener('click', function(e) {
    e.preventDefault();
    closeRegisterForm();
    openLoginForm();
})

closeRegisterFormBtn.addEventListener('click', function(e) {
    closeRegisterForm();
})
closeLoginFormBtn.addEventListener('click', function(e) {
    closeLoginForm();
})

overlay.addEventListener('click', function(e) {
    if(registerOverlay.classList.contains('open')) {
        closeRegisterForm();
    }
    else if(loginOverlay.classList.contains('open')) {
        closeLoginForm();
    }
})

// operations
const tabContainer = document.querySelector('.tabs-container');
const tab = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.operation--text-container');

const removeActiveClassFromEverythingBtn = () => {
    operationsLink.forEach(link => {
        if(link.classList.contains('active')) {
            link.classList.remove('active');
        }
    })
}

const addHiddenClassFromEveryTabcontentContainer = () => {
    tabContent.forEach(contentDiv => {
        if(!contentDiv.classList.contains('hidden')) {
            contentDiv.classList.add('hidden');
        }
    })
}

tabContainer.addEventListener('click', function(e) {
    const selected = e.target;
    
    removeActiveClassFromEverythingBtn();
    e.target.classList.add('active');

    addHiddenClassFromEveryTabcontentContainer();
    document.querySelector(`.tab-content--${selected.dataset.tab}`).classList.remove('hidden');
})

// smooth scrolling effect

const navlinks = document.querySelector('.navlinks');

navlinks.addEventListener('click', function(e) {

    if(e.target.classList.contains('anchor__link')) {
        e.preventDefault();

        const id = e.target.getAttribute('href');

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})

// reveal on scroll

const allSections = document.querySelectorAll('section');

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('scrollHidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2,
})

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('scrollHidden');
})

// Lazy Loading Images

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {

    const [entry] = entries;

    if(!entry.isIntersecting) return;

    const targetImage = entry.target;

    targetImage.src = targetImage.dataset.src;

    // also remove blur class
    // but it will instantly remove blur class even if the image is 
    // not loaded yet
    imgObserver.unobserve(targetImage);
    
    targetImage.addEventListener('load', function() {
        targetImage.classList.remove('lazy-img');
    })

}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0
})

lazyImages.forEach(img => imgObserver.observe(img));

// slider

const slides = document.querySelectorAll('.testimonial');
const slider = document.querySelector('.testimonials-container');

const leftBtn = document.querySelector('.left-arrow');
const rightBtn = document.querySelector('.right-arrow');

let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = function(n) {
    slides.forEach((s, i) => s.style.transform = `translateX(${180 * (i - n)}%)`);
}

goToSlide(0);

const nextSlide = function() {
    currentSlide++;
    if(currentSlide > maxSlides - 1) {
        currentSlide = 0;
    }
    goToSlide(currentSlide);
}

const prevSlide = function() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = maxSlides - 1;
    }
    goToSlide(currentSlide);
}


rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') prevSlide();
    else if(e.key === 'ArrowRight') nextSlide();
});

// create dots dynamically according to number of testimonials

const dotContainer = document.querySelector('.dots-container');

const createDots = function() {
    slides.forEach(function(_, i) {
        if(i == 0) {
            dotContainer.insertAdjacentHTML(
                'beforeend', 
                `<span class="dots active" data-slide="${i}"></span>`
            );
        }
        else {
            dotContainer.insertAdjacentHTML(
                'beforeend', 
                `<span class="dots" data-slide="${i}"></span>`
            );
        }
    })
}

createDots();



const removeActiveFromAllButtons = function(e) {
    const allDots = document.querySelectorAll('.dots');
    allDots.forEach(dot => {
        if(dot.classList.contains('active')) {
            dot.classList.remove('active');
        }
    });
}

dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots')) {
        const slide = e.target.dataset.slide;
        removeActiveFromAllButtons();
        e.target.classList.add('active');
        goToSlide(slide);
    }
})