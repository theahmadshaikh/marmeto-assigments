let slidersData = [];

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
    // this.mountSplider();
  }

  // mountSplider() {
  //   this.splideInstance = new Splide(this.splideNode, {
  //     type: 'loop',
  //     perPage: 1,
  //     autoplay: true,
  //   });
  //   this.splideInstance.mount();
  // }
}


class CustomThumbnailsSlider extends CustomSlider {
  constructor() {
    super();
  }

  connectedCallback() {
    this.splideNode = this.querySelector(".splide");

    // Ensure data is parsed correctly
    this.slidesData = this.dataset.customSliderData
      ? JSON.parse(this.dataset.customSliderData)
      : [];

    if (!this.splideNode || this.slidesData.length === 0) return;

    const thumbnailsList = this.querySelector(".splide__list");
    if (!thumbnailsList) return;

    // Render thumbnails
    thumbnailsList.innerHTML = this.slidesData.map((slide, index) => {
      return `
        <li class="splide__slide">
          <img src="${slide.src}" alt="Thumbnail ${index}" class="thumbnail">
        </li>
      `;
    }).join("");

    // Mount the thumbnails slider with correct config
    // this.splideInstance = new Splide(this.splideNode, {
    //   fixedWidth: 120,
    //   fixedHeight: 90,
    //   isNavigation: true, // This is crucial for making it clickable
    //   gap: 10,
    //   perPage: 3,
    //   pagination: false,
    //   cover: true,
    // });

    // this.splideInstance.mount();
  }

  
}




customElements.define('custom-slider', CustomSlider);
customElements.define('custom-thumbnails-slider', CustomThumbnailsSlider);


const renderSlider = (slidersData) => {
  document.querySelector("body").innerHTML = `
    <custom-slider data-custom-slider-data='${JSON.stringify(slidersData).replace(/'/g, "&apos;")}' id="main-slider">
      <section class="splide" aria-label="Main Slider">
        <div class="splide__track">
          <ul class="splide__list"></ul>
        </div>
      </section>
    </custom-slider>

    <custom-thumbnails-slider data-custom-slider-data='${JSON.stringify(slidersData).replace(/'/g, "&apos;")}' id="thumbnail-slider">
      <section class="splide" aria-label="Thumbnails">
        <div class="splide__track">
          <ul class="splide__list"></ul>
        </div>
      </section>
    </custom-thumbnails-slider>
  `;
  const mainSplide = new Splide("#main-slider .splide", { type: 'loop', perPage: 1, autoplay: true });
  const thumbSplide = new Splide("#thumbnail-slider .splide", {
    fixedWidth: "33%",
    fixedHeight: 90,
    isNavigation: true, 
    gap: 10,
    perPage: 3,
    pagination: false,
    cover: true,
  });

 console.log(mainSplide.sync(thumbSplide)); // Sync both sliders
  mainSplide.mount();
  thumbSplide.mount();
  
};

const fetchData = async()=>{
  try {
    const response = await fetch("./db.json");
    const slider = await response.json();
    slidersData = slider.data;
    renderSlider(slidersData);
  } catch (error) {
    console.log(error)
  }
}

  document.addEventListener("DOMContentLoaded", async() => {
    await fetchData();
  });
  



