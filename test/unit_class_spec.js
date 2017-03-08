const debug = require('debug')('dply:test:unit:timer_class')
const Timer = require('../lib/class')
const expect = require('chai').expect


describe('Unit::Timer', function () {

  describe('Timer class', function(){

    describe('instance', function() {

      let timer = null

      beforeEach(function(){
        timer = new Timer()
      })

      it('should create an instance', function(){
        expect( timer ).to.be.a.instanceOf( Timer )
      })

      it('should have a uid', function(){
        expect( timer.class_uid ).to.match( /^[a-f0-9-]{36}$/ )
      })

      it('should start and return a time', function(){
        expect( timer.start() ).to.be.a.number
      })

      it('should end and return a time', function(){
        timer.start()
        expect( timer.end() ).to.be.a.number
      })

      it('should return the total after end', function(){
        let a = timer.start()
        let b = timer.stop()
        expect( timer.total() ).to.be.a.number
        expect( timer.total() ).to.equal( b - a )
      })

      it('should return a current time value', function(done){
        timer.start()
        setTimeout(()=>{
          expect( timer.current() ).to.be.a.number
          expect( timer.current() ).to.be.gt(2)
          expect( timer.current() ).to.be.lt(50)
          done()
        },3)
      })

      it('should error on multiple starts', function(){
        timer.start()
        expect( ()=> timer.start() ).to.throw('Timer already started')
      })

      it('should error on multiple stops', function(){
        timer.start()
        timer.stop()
        expect( ()=> timer.stop() ).to.throw('Timer already stopped')
      })

      it('should error on total without start', function(){
        expect( ()=> timer.total() ).to.throw('Timer not started')
      })

      it('should error on total without stop', function(){
        timer.start()
        expect( ()=> timer.total() ).to.throw('Timer not stopped')
      })

      it('should error on current without start', function(){
        expect( ()=> timer.current() ).to.throw('Timer not started')
      })

      it('should log', function(){
        let spy = timer.log_fn = sinon.spy()
        timer.log('test')
        expect( spy.called ).to.be.true
      })

      it('should log an id', function(){
        timer = new Timer('anid')
        let spy = timer.log_fn = sinon.spy()
        timer.log('test')
        expect( spy.called ).to.be.true
      })

      it('should stop and log', function(){
        let spy = timer.log_fn = sinon.spy()
        timer.start()
        timer.endLog()
        expect( spy.called ).to.be.true
      })

    })


    describe('statics', function(){

      it('should return a new timer, started', function(){
        let timer = Timer.start()
        expect( timer ).to.be.an.instanceOf( Timer )
        expect( timer.current() ).to.not.throw
        expect( timer.current() ).to.be.a.number
      })

    })


  })

})
