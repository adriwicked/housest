module.exports = (function () {
  const puppeteer = require('puppeteer');  
  const baseURL = 'https://www.fotocasa.es/es/alquiler/casas/espana/todas-las-zonas/l'
  let zipCode = '';

  function getHousesByZipCode(_zipCode) {
    let browser = {};
    let page = {};
    zipCode = _zipCode;

    return puppeteer.launch()
      .then(_saveBrowserAndCreatePage)
      .then(_savePageAndDirectToURL)
      .then(_getHousesArrayAndCloseBrowser)
      .then(_closeBrowserAndReturnHouses)
      .catch(e => e);
  }

  function _saveBrowserAndCreatePage(_browser) {
    browser = _browser;
    return _browser.newPage();
  }

  function _savePageAndDirectToURL(_page) {
    page = _page;
    let fotocasaURL = _buildFotocasaURL();
    return page.goto(fotocasaURL);
  }

  function _buildFotocasaURL() {
    return `${baseURL}?zipCode=${zipCode}`;
  }

  function _getHousesArrayAndCloseBrowser() {
    return page.evaluate(() => {
      return Array.from(document.querySelectorAll('.sui-CardComposable'))
        .map(node => {
          let houseTitle = node.querySelector('h3.re-Card-title').innerText;          

          return {
            price: node.querySelector('.re-Card-price > span').innerText,
            address: houseTitle.split(' en ')[1],
            type: houseTitle.split(' en ')[0]
          };
        })
      })
  }

  function _closeBrowserAndReturnHouses(houses) {
    return browser.close().then(() => houses);
  }

  return {
    getHousesByZipCode: getHousesByZipCode
  }
})();