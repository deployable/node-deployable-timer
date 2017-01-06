const mix = require('mixwith').mix
const MixinClassUid = require('deployable-mixin-class_uid')

class TimerMixer {}
module.exports = class Timer extends mix(TimerMixer).with(MixinClassUid) {

  static start() {
    let timer = new Timer()
    timer.start()
    return timer
  }

  start () {
    if (this._start) throw new Error('Timer already started')
    this._end = null
    return this._start = Date.now()
  }

  end () {
    if (this._end) throw new Error('Timer already ended') 
    return this._end = Date.now()
  } 

  total () {
    if (!this._start) throw new Error('Timer not started')
    if (!this._end)   throw new Error('Timer not ended') 
    return this._total = this._end - this._start
  }

  current () {
    if (!this._start) throw new Error('Timer not started')
    return Date.now() - this._start
  }

}
