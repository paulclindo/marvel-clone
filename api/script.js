const puppeteer = require("puppeteer");
const fs = require("fs");

const URL = "https://www.marvel.com/";

function getData($arr, arr = [], selectorItem, selectorProps) {
  $arr.forEach((item, index) => {
    arr.push({});
  });
}

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /* === Take an screenshot of page */
  // await page.screenshot({
  //   path: "screenshot.png",
  //   fullPage: true
  // });

  async function getPageData() {
    await page.goto(URL);

    const data = await page.evaluate(() => {
      const data = [];
      const baseSlides = [];
      const podcast = [];
      const comic = [];
      const latest = [];

      const $slidesComics = document.querySelectorAll(
        "#sets-4 div.slider__item"
      );
      const $baseSlides = document.querySelectorAll(
        "#masthead-2 div.baseCarousel__wrapper .baseCarousel__page"
      );
      const $comic = document.querySelectorAll("#sets-9 div.slider__item");
      const $latest = document.querySelectorAll(
        "#two_column-7 .mvl-card--feed"
      );
      const $podcast = document.querySelectorAll(
        "#content_grid-6 .mvl-card--media"
      );

      $slidesComics.forEach((item, index) => {
        data.push({
          id: index++,
          imageUrl: item.querySelector(".card-thumb-frame__thumbnail").src,
          description: item
            .querySelector(".card-body__headline")
            .textContent.trim(),
          year: item
            .querySelector(".card-footer__secondary-text")
            .textContent.trim()
        });
      });

      $baseSlides.forEach((item, index) => {
        baseSlides.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          title: item.querySelector(".masthead__headline").textContent.trim(),
          description: item.querySelector(".masthead__copy").textContent.trim()
        });
      });

      $comic.forEach((item, index) => {
        comic.push({
          id: index++,
          imageUrl: item.querySelector(".card-thumb-frame__thumbnail").src,
          description: item
            .querySelector(".card-body__headline")
            .textContent.trim(),
          year: item
            .querySelector(".card-footer__secondary-text")
            .textContent.trim()
        });
      });
      $podcast.forEach((item, index) => {
        podcast.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          label: item.querySelector(".card-body__unlinked").textContent.trim(),
          title: item.querySelector(".card-body__headline").textContent.trim()
        });
      });
      $latest.forEach((item, index) => {
        latest.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1),
          subtitle:
            item.querySelector(".card-body__linked") !== null
              ? item.querySelector(".card-body__linked").textContent.trim()
              : null,
          title:
            item.querySelector(".card-body__headline") !== null
              ? item.querySelector(".card-body__headline").textContent.trim()
              : null,
          time:
            item.querySelector("span.card-footer__overlay-time") !== null
              ? item
                  .querySelector("span.card-footer__overlay-time")
                  .textContent.trim()
              : null
        });
      });
      return {
        baseSlides,
        slidesComics: data,
        comic,
        podcast,
        latest
      };
    });

    console.log("grab it!", data);
    fs.writeFile("data.json", JSON.stringify(data), () => {
      console.log("data has been written");
    });
  }
  getPageData();
}

run();
