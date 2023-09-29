const images = [
  '../../src/assets/image_1.jpg',
  '../../src/assets/image_2.jpg',
  '../../src/assets/image_3.jpeg',
  '../../src/assets/image_4.jpg',
  '../../src/assets/image_5.jpg'
]

const prevBtn = document.getElementById('prev_button');
const nextBtn = document.getElementById('next_button');
const leftImg = document.getElementById('left-image');
const sliderImg = document.getElementById('slider-image');
const rightImg = document.getElementById('right-image');
const pathImg = document.getElementById('path-img');
const indexImg = document.getElementById('index-img');

let currentIndex = 0;

function updateSlider() {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;
  indexImg.innerText = currentIndex;
  pathImg.innerText = images[currentIndex];
  
  switch (currentIndex) {
    case 0:
      leftImg.style.display = 'none';
      prevBtn.classList.add('inactive');
      break;
    case images.length - 1:
      rightImg.style.display = 'none';
      nextBtn.classList.add('inactive');
      break;
    default:
      leftImg.style.display = 'block';
      prevBtn.classList.remove('inactive');
      rightImg.style.display = 'block';
      nextBtn.classList.remove('inactive');
      break;
  }

  leftImg.src = images[prevIndex];
  sliderImg.src = images[currentIndex];
  rightImg.src = images[nextIndex];
}

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  updateSlider();
}

prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));

updateSlider();