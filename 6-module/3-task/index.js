import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  elem = null;
  #slides = [];

  constructor(slides) {
    this.#slides = slides;

    this.elem = this.#render();

    this.#initCarousel();
    this.#addToCart();

  }

  #render() {
    return createElement(`
    <div class="carousel">

    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">

    ${this.#slides.map((obj) => `
    <div class="carousel__slide" data-id="${obj.id}">
        <img src="/assets/images/carousel/${obj.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${obj.price.toFixed(2)}</span>
          <div class="carousel__title">${obj.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`).join("/n")
    }
    </div>
    `)


  }

  #initCarousel() {
    const leftButton = this.elem.querySelector('.carousel__arrow_left');
    const rightButton = this.elem.querySelector('.carousel__arrow_right');
  
    const carousel = this.elem.querySelector('.carousel__inner');
    
    let currentStep = 0;
   
    const countPictures = (carousel.querySelectorAll('.carousel__slide')).length;
  
  
    function checkLeft() {
    
      return (currentStep == 0)? true : false;
    }
    
    
    function checkRight() {
      
      return (currentStep == -carousel.offsetWidth * (countPictures-1))? true : false;
    }
  
  
  
    if (checkLeft()) {
          leftButton.style.display = 'none';
    }
    else if(checkRight()) 
          rightButton.style.display = 'none';
    
  
    rightButton.addEventListener('click', () => {                    
  
     if (checkLeft()) 
     leftButton.style.display = '';
  
     
      currentStep -= carousel.offsetWidth;
      carousel.style.transform = `translateX(${currentStep}px)`;
  
  
      if (checkRight()) 
     rightButton.style.display = 'none';
    })
  
    leftButton.addEventListener('click', () => {
  
      if (checkRight()) 
      rightButton.style.display = '';
  
  
      currentStep += carousel.offsetWidth;
      carousel.style.transform = `translateX(${currentStep}px)`;
  
  
      if (checkLeft()) 
      leftButton.style.display = 'none';
    })
  
  }

  #addToCart() {
    this.buttons = Array.from(this.elem.querySelectorAll('.carousel__button')) 
    this.buttons.map( (but, i) => {but.addEventListener("click", () => {  

    but.dispatchEvent(new CustomEvent("product-add", {
          detail: this.#slides[i].id, 
         bubbles: true,
      })) 
    })})

  }

  }




