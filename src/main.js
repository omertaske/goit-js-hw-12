import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api.js';
import { addImage } from './js/getImage-api.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let imagesShown = 0;

const loader = document.querySelector('.loader');
const form = document.getElementById('searchForm');
const galleryElement = document.querySelector('.gallery');

const loadMoreBtn = document.getElementById('loadMoreBtn');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  galleryElement.innerHTML = '';
  toogleLoader('block');

  currentQuery = e.currentTarget.elements.searchInput.value.trim();
  currentPage = 1;
  imagesShown = 0;

  try {
    const data = await searchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({ title: 'Caution', message: 'No images found!' });
      loadMoreBtn.style.display = 'none';
      return;
    }

    renderGallery(data);
    showLoadMore(data);
    e.target.reset();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    toogleLoader('none');
  }
}

async function onLoadMore() {
  currentPage++;
  toogleLoader('block');

  try {
    const data = await searchImages(currentQuery, currentPage);
    renderGallery(data);
    showLoadMore(data);
    scrollGallery();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    toogleLoader('none');
  }
}

function renderGallery(data) {
  imagesShown += data.hits.length;
  galleryElement.insertAdjacentHTML('beforeend', addImage(data));
  lightbox.refresh();
}

function showLoadMore(data) {
  if (imagesShown >= totalHits) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function scrollGallery() {
  const card = document.querySelector('.gallery .card');
  const cardHeight = card?.getBoundingClientRect().height || 0;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}


const lightbox = new SimpleLightbox('.card .place-for-image a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function toogleLoader(display) {
  loader.style.display = display;
}

loader.style.display = 'none';

form.addEventListener('submit', search);

async function search(e) {
  e.preventDefault();

  galleryElement.innerHTML = '';

  const input = e.currentTarget.elements.searchInput.value;

  toogleLoader('block');

  searchImages(input).then(data => {
    if (data.total === 0) {
      iziToast.warning({
        title: 'Caution',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });

      return 0;
    } else {
      galleryElement.insertAdjacentHTML('beforeend', addImage(data));
      lightbox.refresh();
      e.target.reset();
    }
  }).catch(error => {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }).finally(() => {
    toogleLoader('none');
  });
}