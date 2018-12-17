describe("Houses extractor - ", function () {
  let housesExtractor;

  beforeAll(function() {
    housesExtractor = require('../src/houses-extractor');
  });

  it("houses-extractor module should exist", function () {    
    expect(housesExtractor).not.toBe(false);    
  });  
})