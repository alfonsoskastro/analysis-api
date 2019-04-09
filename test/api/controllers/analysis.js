var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('analysis', function() {

    describe('GET /stats', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/stats')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);           

            done();
          });
      });    

    });

  });

});
