const debug = require('debug')('dply:timer')
const uuid = require('uuid')


module.exports = class Timer {

 static start ( id ) {
    let timer = new Timer(id)
    timer.start()
    return timer
  }

  static log ( id, time ) {
    console.log(`Timer ${id} took ${time} ms`)
  }

  constructor ( id, options = {} ) {
    this.class_uid = uuid.v4()
    this.id = id
    this.logger = options.logger || console || { info: '',warn: '', error: ''}
    this.log_fn = options.log_fn || this.constructor.log
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

  stopAndLog () {
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
