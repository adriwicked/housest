describe('Google maps api - ', function () {
  let googleMapsAPI;

  beforeAll(function () {
    googleMapsAPI = require('../src/google-maps-api');
  });

  it('google-maps-api module should exist', function () {
    expect(googleMapsAPI).not.toBe(false);
  });
  
  it('getCoordinatesFromAddress should return an object', function () {
    googleMapsAPI.getCoordinatesFromAddress('Chamartin')
      .then(location => {
        const actual = typeof location;
        const expected = 'object';

        expect(actual).toBe(expected);
        done();
      })
  })

  it("objects getCoordinatesFromAddress returns should have lat and lng properties", function (done) {
    googleMapsAPI.getCoordinatesFromAddress('Chamartin')
      .then(location => {        
        const actual = hasLatAndLongProperties(location)
        const expected = true;

        expect(actual).toBe(expected);
        done();

        function hasLatAndLongProperties(location) {
          return 'lat' in location && 'lng' in location
        }
      })
      .catch(e => console.error(e));
  });
})