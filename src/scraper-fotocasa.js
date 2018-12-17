module.exports = (function () {
  const puppeteer = require('puppeteer');  
  const url = 'https://www.fotocasa.es/es/alquiler/casas/madrid-capital/ciudad-jardin/l?latitude=40.4462&longitude=-3.6747&zipCode='
  let zipCode = '';

  function getHousesByZipCode(_zipCode) {
    let browser = {};
    let page = {};
    zipCode = _zipCode;

    return puppeteer.launch()
      .then(_saveBrowserAndCreatePage)
      .then(_savePageAndDirectToURL)
      .then(_getHousesArrayAndCloseBrowser)            
  }

  function _saveBrowserAndCreatePage(_browser) {
    browser = _browser;
    return _browser.newPage();
  }

  function _savePageAndDirectToURL(_page) {
    page = _page;
    return page.goto(url + zipCode)
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
          }
        })
      })
      .then(_closeBrowserAndReturnHouses)
      .catch(e => console.error(e));
  }

  function _closeBrowserAndReturnHouses(houses) {
    return browser.close().then(() => houses);
  }

  return {
    getHousesByZipCode: getHousesByZipCode
  }
})();