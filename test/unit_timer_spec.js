const debug = require('debug')('dply:test:unit:timer')
const Timer = require('../lib/timer')


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

      it('should have a prototype of the last mixin', function(){
        let parent = Object.getPrototypeOf(timer.constructor).name;
        expect( parent ).to.equal( "MixinClassUid" )
      })

      
      it('should start and return a time', function(){
        expect( timer.start() ).to.be.a.number
      })

      it('should end and return a time', function(){
        timer.start()
        expect( timer.end() ).to.be.a.number
      })

      it('should return the total after end', function(){
        a = timer.start()
        b = timer.end()
        expect( timer.total() ).to.be.a.number
        expect( timer.total() ).to.equal( b - a )
      })

      it('should return a current time value', function(done){
        a = timer.start()
        setTimeout(()=>{
          expect( timer.current() ).to.be.a.number
          expect( timer.current() ).to.be.gt(2)
          expect( timer.current() ).to.be.lt(50)
          done()
        },3)
      })

    })


    describe('statics', function(){

      it('should return a new timer, started', function(){
        expect( Timer.start() ).to.be.an.instanceOf( Timer )
      })

    })


  })

})
