let slidersData = [];
fetch("./db.json")
  .then((response) => response.json())
  .then((slider) => {
    slidersData = slider.data;
    renderSlider(slidersData);
  });

class CustomSlider extends HTMLElement {
  constructor() {
    super();
    
    this.splideNode = this.querySelector('.splide');

   
    this.slidesData = JSON.parse(this.dataset.customSliderData) || [];

    

    
    
  }

  connectedCallback() { 
    const classNames = ["first-slide", "second-slide", "third-slide"];
    const slideList = this.querySelector(".splide__list");
    slideList.innerHTML = this.slidesData.map((slide, index) => {
      return `
        <li class="splide__slide">
          <div>
            <div class="content" width="100vw" height="60vh">
              <img src="${slide.src}" alt="${slide.description}" class="slide-image" >
              <div class ="overlay ${classNames[index]}">
              <button>${slide.first_button_content}</button>
              <p>${slide.description}</p>
              <button>${slide.second_button_content}</button>
              </div>
            </div>
          </div>
        </li>
      `;
    }).join(""); 
    this.mountSplider();
  }

  mountSplider() {
    const splideInstance = new Splide(this.splideNode, {
      type: 'loop',
      perPage: 1,
      autoplay: true,
    });
    splideInstance.mount();
  }
}
customElements.define('custom-slider', CustomSlider);

const renderSlider = (slidersData) => {
  document.querySelector("body").innerHTML = `
    <custom-slider data-custom-slider-data='${JSON.stringify(slidersData).replace(/'/g, "&apos;")}'>
      <section class="splide" aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list"></ul>
        </div>
      </section>
    </custom-slider>
  `;
};




