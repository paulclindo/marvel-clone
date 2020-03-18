// CSS.paintWorklet.addModule("marvelbtn.js");
const URL_BASE = "http://localhost:3000";

/*DOM*/
const $podcastWrapper = document.querySelector(".podcast__cards__container");
const $comicFirstWrapper = document.querySelector(".comicfirst__wrapper");
const $comicWrapper = document.querySelector(".comic__cards__container");

/*FETCH DATA*/
const getData = async URL => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
const podcastTemplate = item => {
  return `<div class="podcast__card">
            <a href="">
              <div style="background-image: url(${item.imageUrl})" class="card--image"></div>
            </a>
            <a href="">
              <div class="card--header">${item.label}</div>
            </a>
            <a href="">
              <div class="card--body">
                ${item.title}
              </div>
            </a>
          </div>`;
};
// const firstComicTemplate = item => {
//   return `<div class="suscription__card">
//             <a href="#">
//               <div  style="width:200px; background-image: url(${item.imageUrl})" class="card--image"></div>
//               <div class="">${item.description}</div>
//               <p class="">${item.year}</p>
//             </a>
//           </div>`;
// };

const comicTemplate = item => {
  return `<div class="suscription__card">
            <a href="#">
              <div style="width:200px; background-image: url(${item.imageUrl})" class="card--image"></div>
              <div style="white-space:normal;">${item.description}</div>
              <p class="">${item.year}</p>
            </a>
          </div>`;
};

getData(`${URL_BASE}/podcast`).then(podcasts => {
  let podcastsHTML = "";
  podcasts.map(podcast => {
    podcastsHTML += podcastTemplate(podcast);
  });
  $podcastWrapper.innerHTML = podcastsHTML;
});

getData(`${URL_BASE}/comic`).then(comics => {
  let comicHTML = "";
  comics.map(comic => {
    comicHTML += comicTemplate(comic);
  });
  $comicWrapper.innerHTML = comicHTML;
});
getData(`${URL_BASE}/slidesComics`).then(comics => {
  let comicHTML = "";
  comics.map(comic => {
    comicHTML += comicTemplate(comic);
  });
  $comicFirstWrapper.innerHTML = comicHTML;
});
