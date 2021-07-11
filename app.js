const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('img.lightbox__image'),
  closeLightboxBtn: document.querySelector('.lightbox .lightbox__button'),
  overlay: document.querySelector('div.lightbox__overlay'),
};

// Переменная индекса текущего выбранного изображения
let lightboxImageIdx;

// ================== разметка галереи ======================
const galleryItemsElements = galleryItems.map(
  el => `<li  class="gallery__item"><a class="gallery__link" href=${el.original}><img
      class="gallery__image"
      src=${el.preview}
      data-source=${el.original}
      alt="${el.description}"
    /></a></li>`,
);

refs.gallery.insertAdjacentHTML('afterbegin', galleryItemsElements.join(''));
const imgArray = [...document.querySelectorAll('.gallery__image')];
// ================== открытие модалки ======================
refs.gallery.addEventListener('click', ev => {
  ev.preventDefault();
  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = ev.target.dataset.source;
  refs.lightboxImage.alt = ev.target.alt;
  refs.closeLightboxBtn.addEventListener('click', closeLightBox);
  refs.overlay.addEventListener('click', closeLightBox);
  document.addEventListener('keydown', onGalleryKeyPress);

  // Запись значения индекса текущего выбранного изображения
  lightboxImageIdx = imgArray.indexOf(ev.target);
});

function closeLightBox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  refs.closeLightboxBtn.removeEventListener('click', closeLightBox);
  refs.overlay.removeEventListener('click', closeLightBox);
  document.removeEventListener('keydown', onGalleryKeyPress);
}

function onGalleryKeyPress(ev) {
  if (ev.code === 'Escape') {
    closeLightBox();
  }

  galleryScroll(ev);
}

function galleryScroll(ev) {
  if (ev.key === 'ArrowLeft') {
    if (lightboxImageIdx > 0) {
      lightboxImageIdx -= 1;
    } else {
      lightboxImageIdx = galleryItems.length - 1;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
  if (ev.code === 'ArrowRight') {
    if (lightboxImageIdx < galleryItems.length - 1) {
      lightboxImageIdx += 1;
    } else {
      lightboxImageIdx = 0;
    }
    refs.lightboxImage.src = galleryItems[lightboxImageIdx].original;
    refs.lightboxImage.alt = galleryItems[lightboxImageIdx].description;
  }
}
