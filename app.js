import data from "./data.js";
// CSS.paintWorklet.addModule("marvelbtn.js");

/*DOM*/
// const $global = document.querySelector("#content");
// const $loader = document.querySelector("#loader");
const $carouselTrack = document.querySelector(".carousel__track");
const $streamContainer = document.querySelector(".streaming__cards__container");
const $comicFirstWrapper = document.querySelector(".comicfirst__wrapper");
const $comicSecondWrapper = document.querySelector(".comicsecond__wrapper");
const $podcastWrapper = document.querySelector(".podcast__cards__container");
const $lastesRectWrapper = document.querySelector(".latest__cards");
const $lastesBoxWrapper = document.querySelector(".latest__right .feed__cards");
const $videosWrapper = document.querySelector(".video__vertical");

const {
  baseSlides,
  streams,
  comicsone,
  comicstwo,
  podcasts,
  latestrects,
  latestboxs,
  videos,
} = data;
baseSlides.forEach((slide) => {
  const carouselEl = document.createElement("li");
  carouselEl.classList.add("carousel__slide");

  carouselEl.innerHTML = `
    <a href="" class="carousel__page">
      <img
        class="carousel__image"
        src=${slide.imageUrl}
        alt=""
      />
      <div class="carousel__standard">
        <div class="carousel__info">
        <h1>${slide.title}</h1>
        <p>${slide.description}</p>
        <button class="btn--marvel">Watch now</button>
        </div>
      </div>
    </a>
  `;
  $carouselTrack.appendChild(carouselEl);
});

streams.forEach((stream) => {
  const streamEl = document.createElement("div");
  streamEl.classList.add("streaming__card");
  streamEl.innerHTML = `<a href="">
              <div class="card--image" style="background-image:url(${stream.imageUrl}"></div>
            </a>
            <a href="">
              <div class="card--header">${stream.type}</div>
            </a>
            <a href="">
              <div class="card--body">
                ${stream.description}
              </div>
            </a>`;
  $streamContainer.appendChild(streamEl);
});

comicsone.forEach((comic) => {
  const comicEl = document.createElement("div");
  comicEl.classList.add("suscription__card");
  comicEl.innerHTML = `<a href="#">
    <div style="background-image: url(${comic.imageUrl}); background-size: cover;" class="card--image"></div>
    <div class="">${comic.description}</div>
    <p class="year">${comic.year}</p>
  </a>`;
  $comicFirstWrapper.appendChild(comicEl);
});
comicstwo.forEach((comic) => {
  const comicEl = document.createElement("div");
  comicEl.classList.add("suscription__card");
  comicEl.innerHTML = `<a href="#">
    <div  style="background-image: url(${comic.imageUrl}); background-size: cover;" class="card--image"></div>
    <div class="">${comic.description}</div>
    <p class="year">${comic.year}</p>
  </a>`;
  $comicSecondWrapper.appendChild(comicEl);
});
podcasts.forEach((podcast) => {
  const podcastEl = document.createElement("div");
  podcastEl.classList.add("podcast__card");
  podcastEl.innerHTML = `<a href="">
      <div style="background-image: url(${podcast.imageUrl})" class="card--image"></div>
    </a>
    <a href="">
      <div class="card--header">${podcast.label}</div>
    </a>
    <a href="">
      <div class="card--body">
        ${podcast.title}
      </div>
    </a>`;
  $podcastWrapper.appendChild(podcastEl);
});
latestrects.forEach((item) => {
  const lastestEl = document.createElement("div");
  lastestEl.classList.add("card__latest__wrapper");
  lastestEl.innerHTML = `
    <figure class="card__latest__image">
            <img
              src=${item.imageUrl}
              alt=""
            />
          </figure>
          <div class="card__latest__info">
            <p class="card__tag">${item.tag || ""}</p>
            <a class="card__heading">${item.label || ""}</a>
            <p class="card__title">
              ${item.title}
            </p>
            <p class="card__time">${item.time || ""}</p>
          </div>
  `;
  $lastesRectWrapper.appendChild(lastestEl);
});
latestboxs.forEach((item) => {
  const lastestEl = document.createElement("div");
  lastestEl.classList.add("feed__card__wrapper");
  lastestEl.innerHTML = `
    <figure class="feed__card__image">
      <img
        src=${item.imageUrl}
        alt=""
      />
    </figure>
    <div class="feed__card__info">
      <p class="feed__card__heading">${item.subtitle}</p>
      <p class="feed__card__description">
       ${item.title}
      </p>
    </div>
  `;
  $lastesBoxWrapper.appendChild(lastestEl);
});
videos.forEach((video) => {
  const videoEl = document.createElement("div");
  videoEl.classList.add("card__video__wrapper");
  videoEl.innerHTML = `
    <figure class="card__video__thumbnail">
      <img
        src=${video.imageUrl}
        alt=""
      />
      <div class="card__video__title">
        ${video.title}
      </div>
      <button class="btn--play">
        <span class="play__icon">
          <svg version="1.1" id="Capa_1" viewBox="0 0 41.999 41.999">
            <path
              d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
            c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
            c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"
            ></path>
          </svg>
        </span>
      </button>
    </figure>
  `;
  $videosWrapper.appendChild(videoEl);
});

/* carousel animation */
const carouselItems = $carouselTrack.querySelectorAll(".carousel__slide");

setTimeout(() => {
  console.log(carouselItems[0]);
  carouselItems[0].classList.add("prev");
  carouselItems[0].classList.add("next");
}, 1000);
// carouselItems[1].classList.add = "next";
