var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');

function spec(){

  describe('Page Views', function(){

    it('should initialize page views', function(done){
      request.get('/api/pageviews')
        .end(function(err, res){
          var pageViews = Number(res.text);
          expect(pageViews).to.equal(1);
          done();
        });
    });

  });

}

module.exports = spec;