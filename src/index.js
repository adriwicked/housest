require('dotenv').config();

const housesExtractor = require('./houses-extractor');
const googleMapsAPI = require('./google-maps-api');


housesExtractor.updateHouses();