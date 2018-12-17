module.exports = (function () {
  const axios = require('axios');
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?';  

  function getLocationFromAddress(address) {
    const googleMapsURL = _buildGeocodeURL(address, process.env.GOOGLE_API_KEY);

    return new Promise((resolve, reject) => {
      axios.get(googleMapsURL)
        .then(response => resolve(response.data.results[0].geometry.location))
        .catch(e => reject(e))
    })
  }

  function _buildGeocodeURL(address, apiKey) {
    let addressPlusSeparated = _buildPlusSeparatedAddress(address);

    return `${baseURL}address=${addressPlusSeparated}&key=${apiKey}`
  }

  function _buildPlusSeparatedAddress(address) {
    return address.replace(/ /g, '+');
  }

  return {
    getLocationFromAddress: getLocationFromAddress
  }
})();
