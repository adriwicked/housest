module.exports = (function () {
  const axios = require('axios');
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json';  

  function getLocationFromAddress(address) {
    const googleMapsURL = _buildGeocodeURL(address);

    return axios.get(googleMapsURL)
      .then(_getLocationFromResponse)
      .catch(e => reject(e));
  }
  
  function _buildGeocodeURL(address) {
    let addressPlusSeparated = _buildPlusSeparatedAddress(address);
    let apiKey = process.env.GOOGLE_API_KEY;
    return `${baseURL}?address=${addressPlusSeparated}&key=${apiKey}`
  }
  
  function _buildPlusSeparatedAddress(address) {
    return address.replace(/ /g, '+');
  }

  function _getLocationFromResponse(response) {
    return response.data.results[0].geometry.location;
  }

  return {
    getLocationFromAddress: getLocationFromAddress
  }
})();
