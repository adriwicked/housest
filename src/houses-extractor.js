module.exports = (function() {
  const scraperFotocasa = require('./scraper-fotocasa');
  const googleMapsAPI = require('./google-maps-api');
  const utf8 = require('utf8');
  const fs = require('fs');
  const zipCode = '28002';
  const fileName = 'houses.json'

  function updateHouses() {
    scraperFotocasa.getHousesByZipCode(zipCode)
      .then(_addLocationToHouses);
  }  

  function _addLocationToHouses(houses) {
    const promises = houses.map(house => {
      const address = utf8.encode(house.address)

      return googleMapsAPI.getLocationFromAddress(address)
        .then(_addLocationToHouse(house)).catch(_logError);
    });

    return Promise.all(promises)
      .then(_saveHousesInLocalJSON(fileName)).catch(_logError);    
  }

  function _addLocationToHouse(house) {
    return location => Object.assign(house, { location: location });
  }

  function _saveHousesInLocalJSON(fileName) {
    return locatedHouses => {
      fs.writeFileSync(fileName, JSON.stringify(locatedHouses))
      console.log(`Successfully saved ${locatedHouses.length} houses`);
    };
  }

  function _logError(e) {
    console.error(e);
  }

  return {
    updateHouses: updateHouses    
  }
})();
