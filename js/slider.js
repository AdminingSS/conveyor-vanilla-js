window.addEventListener('load', function () {
  const modal = document.getElementById('modal')
  const modalBodyElem = modal.querySelector('.modal__body')
  const slider = document.querySelector('.slider-main');
  const slides = slider.querySelector('.slides');
  const slideElems = slides.querySelectorAll('.slide');
  const slideNumberElem = slider.querySelector('.slide-number');
  const prevButton = slider.querySelector('.prev')
  const nextButton = slider.querySelector('.next')
  const slideOpenElem = slider.querySelector('.slide-open')

  const slidesTotal = slideElems.length

  let currentSlide = 0

  slideNumberElem.innerHTML = `${currentSlide + 1}/${slidesTotal}`

  const useModalImage = () => {
    const imageUrl = slideElems[currentSlide]?.querySelector('img')?.src;
    const imageElem = document.createElement('img')

    imageElem.src = imageUrl
    imageElem.alt = 'image'
    imageElem.classList.add('fancybox-image')

    modalBodyElem.innerHTML = ''
    modalBodyElem.appendChild(imageElem)
    modal.classList.add('open')
  }

  const showSlide = () => {
    const slideWidth = slides.querySelector('.slide').offsetWidth;
    slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    slideNumberElem.innerHTML = `${currentSlide + 1}/${slidesTotal}`
  }

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slidesTotal;
    showSlide();
  }

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slidesTotal) % slidesTotal;
    showSlide();
  }

  slideOpenElem.addEventListener('click',useModalImage)
  prevButton.addEventListener('click', prevSlide)
  nextButton.addEventListener('click', nextSlide)

  const sliderNavigator = document.querySelector('.slider-navigator')
  const slideNavigatorTrack = sliderNavigator.querySelector('.slider-navigator-track')
  const slidesNav = slideNavigatorTrack.querySelector('.slides');
  const prevNavButton = sliderNavigator.querySelector('.prev')
  const nextNavButton = sliderNavigator.querySelector('.next')
  const slideImages = slides.querySelectorAll('img')

  let slideGroups = [];
  for (let i = 0; i < slideImages.length; i += 5) {
    const group = document.createElement('div');
    group.classList.add('slide');
    slideGroups.push(group);

    for (let j = i; j < i + 5 && j < slideImages.length; j++) {
      group.appendChild(slideImages[j].cloneNode(true));
    }
  }

  slideGroups.forEach(function(group) {
    slidesNav.appendChild(group);
  });

  const slideNavElems = slidesNav.querySelectorAll('.slide')
  const slidesNavTotal = slideNavElems.length
  const navImages = slidesNav.querySelectorAll('img')

  let currentNavSlide = 0

  const showNavSlide = () => {
    const slideWidth = slidesNav.querySelector('.slide').offsetWidth;
    slidesNav.style.transform = `translateX(-${currentNavSlide * slideWidth}px)`;
  }

  const nextNavSlide = () => {
    currentNavSlide = (currentNavSlide + 1) % slidesNavTotal;
    showNavSlide();
  }

  const prevNavSlide = () => {
    currentNavSlide = (currentNavSlide - 1 + slidesNavTotal) % slidesNavTotal;
    showNavSlide();
  }

  const toSlide = index => {
    currentSlide = index
    showSlide();
  }

  prevNavButton.addEventListener('click', prevNavSlide)
  nextNavButton.addEventListener('click', nextNavSlide)

  navImages.forEach((image, index) => {
    image.addEventListener('click', () => toSlide(index))
  })

  function initializeMobileSlider(sliderEntity) {
    const slides = sliderEntity.querySelector('.slides');

    let touchStartX = 0;

    sliderEntity.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    });

    sliderEntity.addEventListener('touchmove', function(e) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          sliderEntity === slider ? nextSlide(slides) : nextNavSlide();
        } else {
          sliderEntity === slider ? prevSlide(slides) : prevNavSlide();
        }

        touchStartX = touchEndX;
      }
    });
  }

  initializeMobileSlider(slider)
  initializeMobileSlider(sliderNavigator)
})
