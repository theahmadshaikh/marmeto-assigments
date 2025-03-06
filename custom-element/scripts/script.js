let slidersData = [];
// fetch("./db.json")
//   .then((response) => response.json())
//   .then((slider) => {
//     slidersData = slider.data;
//     renderSlider(slidersData);
//   });

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

<select name="alignment" id="alignment-select">
  <option value="">Please choose alignment</option>
  <option value="left">Align Left</option>
  <option value="center">Align Center</option>
  <option value="right">Align Right</option>
  <option value="justify">Spread Evenly</option>
  <option value="start">Align to Start</option>
  <option value="end">Align to End</option>
  <option value="flex-start">Pack at Start</option>
  <option value="flex-end">Pack at End</option>
  <option value="space-between">Space Between Items</option>
  <option value="space-around">Even Spacing Around</option>
  <option value="space-evenly">Equal Spacing Everywhere</option>
  <option value="baseline">Align by Text Line</option>
  <option value="stretch">Stretch to Fit</option>
</select>

  `;
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
    const alignmentSelect = document.getElementById("alignment-select");
  
    alignmentSelect.addEventListener("change", (event) => {
      console.log("Aligment event")
      const selectedAlignment = event.target.value;
      document.querySelectorAll(".overlay").forEach((overlay) => {
        overlay.classList.remove(
          "align-left", "align-center", "align-right", 
          "align-start", "align-end", "align-flex-start", 
          "align-flex-end", "align-space-between", 
          "align-space-around", "align-space-evenly", 
          "align-baseline", "align-stretch"
        );
  
        if (selectedAlignment) {
          overlay.classList.add(`align-${selectedAlignment}`);
        }
      });
    });
  });
  



