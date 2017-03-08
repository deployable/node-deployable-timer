const debug = require('debug')('dply:timer')
const mix = require('mixwith').mix
const MixinClassUid = require('deployable-mixin-class_uid')


class TimerMixer {}

module.exports = class Timer extends mix(TimerMixer).with(MixinClassUid) {

  static start ( id ) {
    let timer = new Timer(id)
    timer.start()
    return timer
  }

  constructor ( id, options = {} ) {
    super(id, options)
    this.id = id
    this.logger = options.logger || console
    this.log_fn = options.log_fn || this.constructor.log_fn
    debug('creating timer %s', this.id)
  }

  set id ( val ) {
    this._id = val
  }
  get id () {
    if ( this._id === undefined ) return this.class_uid
    return this._id
  }

  start () {
    if (this._start) throw new Error(`Timer already started - ${this.id}`)
    this._end = null
    debug('started timer %s', this.id)
    return this._start = Date.now()
  }

  stop () {
    if (this._end) throw new Error(`Timer already stopped - ${this.id}`)
    debug('stopped timer %s', this.id)
    return this._end = Date.now()
  }

  end () {
    this.stop()
    return this.total()
  }

  log () {
    this.log_fn(this.id, this.time)
  }

  endLog () {
    this.stop()
    this.log()
    return this.total()
  }

  total () {
    if (!this._start) throw new Error(`Timer not started - ${this.id}`)
    if (!this._end)   throw new Error(`Timer not stopped - ${this.id}`)
    return this._total = this._end - this._start
  }

  current () {
    if (!this._start) throw new Error(`Timer not started - ${this.id}`)
    return Date.now() - this._start
  }

}
