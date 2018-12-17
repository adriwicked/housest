describe("Scraper fotocasa - ", function () {
    let scraperFotocasa;
  
    beforeAll(function() {
      scraperFotocasa = require('../src/scraper-fotocasa');
    });
  
    it("scraper-fotocasa module should exist", function () {    
      expect(scraperFotocasa).not.toBe(false);    
    });
  
    it("getHousesByZipCode should return an array", function (done) {
      scraperFotocasa.getHousesByZipCode('28002')
        .then(houses => {
          const actual = Array.isArray(houses) ? 'array' : 'notArray';
          const expected = 'array';
  
          expect(actual).toBe(expected);
          done();
        })
    });
  
    it("objects getHousesByZipCode returns should have price and address properties", function (done) {
      scraperFotocasa.getHousesByZipCode('28002')
        .then(houses => {
          const actual = hasPriceAndAddressProperties(houses[0])
          const expected = true;
  
          expect(actual).toBe(expected);
          done();
  
          function hasPriceAndAddressProperties(house) {
            return 'price' in house && 'address' in house
          }
        })
    });
  })