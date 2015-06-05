var expect = require('chai').expect;
var request = require('supertest')('http://localhost:1337');

function spec(){
  /**
   * NOTE: For this test, must reset contents of db
   * Invoke flushdb on the Redis client to reset
   */
  describe('Page Views', function(){

    it('should initialize page views', function(done){
      request.get('/api/pageviews')
        .end(function(err, res){
          var pageViews = JSON.parse(res.text).total;
          expect(pageViews).to.equal(0);
          done();
        });
    });

    it('should update page views', function(done){
      request.get('/')
        .end(function(err, res){
          request.get('/api/pageviews')
            .end(function(err, res){
              var pageViews = JSON.parse(res.text).total;
              expect(pageViews).to.equal(1);
              done();
            });
        });
    });

  });

}

module.exports = spec;