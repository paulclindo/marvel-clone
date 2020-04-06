const puppeteer = require("puppeteer");
const fs = require("fs");

const URL = "https://www.marvel.com/";

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  /* === Take an screenshot of page */
  // await page.screenshot({
  //   path: "screenshot.png",
  //   fullPage: true
  // });

  async function getPageData() {
    await page.goto(URL);

    const data = await page.evaluate(() => {
      const videosArray = [];
      const streams = [];
      const comicsone = [];
      const baseSlides = [];
      const podcasts = [];
      const comicstwo = [];
      const latestboxs = [];
      const latestrects = [];

      const $baseSlides = document.querySelectorAll(
        "#masthead-2 div.baseCarousel__wrapper .baseCarousel__page"
      );
      const $streams = document.querySelectorAll("#sets-4 div.slider__item");
      const $comicsone = document.querySelectorAll("#sets-5 div.slider__item");
      const $comicstwo = document.querySelectorAll("#sets-9 div.slider__item");
      const $podcasts = document.querySelectorAll(
        "#content_grid-6 .mvl-card--media"
      );
      const $latestbox = document.querySelectorAll(
        "#two_column-7 .rail-cards .mvl-card--feed"
      );
      const $latestrects = document.querySelectorAll(
        "#two_column-7 .feed__cards .mvl-card--feed"
      );
      const $videosEl = document.querySelectorAll(
        "#video-8 .ul-wrapper .video-thumbnail__item"
      );

      $baseSlides.forEach((item, index) => {
        baseSlides.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          title: item.querySelector(".masthead__headline").textContent.trim(),
          description: item.querySelector(".masthead__copy").textContent.trim(),
        });
      });
      $streams.forEach((item, index) => {
        streams.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          type: item.querySelector(".card-body__linked").textContent.trim(),
          description: item
            .querySelector(".card-body__headline")
            .textContent.trim(),
        });
      });
      $comicsone.forEach((item, index) => {
        comicsone.push({
          id: index++,
          imageUrl: item.querySelector(".card-thumb-frame__thumbnail").src,
          description: item
            .querySelector(".card-body__headline")
            .textContent.trim(),
          year: item
            .querySelector(".card-footer__secondary-text")
            .textContent.trim(),
        });
      });
      $comicstwo.forEach((item, index) => {
        comicstwo.push({
          id: index++,
          imageUrl: item.querySelector(".card-thumb-frame__thumbnail").src,
          description: item
            .querySelector(".card-body__headline")
            .textContent.trim(),
          year: item
            .querySelector(".card-footer__secondary-text")
            .textContent.trim(),
        });
      });
      $podcasts.forEach((item, index) => {
        podcasts.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          label: item.querySelector(".card-body__unlinked").textContent.trim(),
          title: item.querySelector(".card-body__headline").textContent.trim(),
        });
      });
      $latestbox.forEach((item, index) => {
        latestboxs.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          subtitle:
            item.querySelector(".card-body__unlinked") !== null
              ? item.querySelector(".card-body__unlinked").textContent.trim()
              : "",
          title:
            item.querySelector(".card-body__headline") !== null
              ? item.querySelector(".card-body__headline").textContent.trim()
              : "",
          time:
            item.querySelector("span.card-footer__overlay-time") !== null
              ? item
                  .querySelector("span.card-footer__overlay-time")
                  .textContent.trim()
              : "",
        });
      });
      $latestrects.forEach((item, index) => {
        latestrects.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          label:
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
              : null,
        });
      });
      $videosEl.forEach((item, index) => {
        videosArray.push({
          id: index++,
          imageUrl: item
            .querySelector(".built__background")
            .style.backgroundImage.slice(4, -1)
            .replace(/"/g, ""),
          title:
            item.querySelector(".video-thumbnail__item-footer-label") !== null
              ? item
                  .querySelector(".video-thumbnail__item-footer-label")
                  .textContent.trim()
              : "",
        });
      });
      return {
        baseSlides,
        streams,
        comicsone,
        comicstwo,
        podcasts,
        latestboxs,
        latestrects,
        videosArray,
      };
    });

    // console.log("grab it!", data);
    fs.writeFile("data.json", JSON.stringify(data), () => {
      console.log("data has been written");
    });
  }
  getPageData();
}

run();
