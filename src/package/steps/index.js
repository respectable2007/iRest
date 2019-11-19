import { base } from '../../utils/base.js';
export var Step = base.extend({
  events: {
    'button': {
      'click': function(e) {
        let active = this._opts.active,
            total = this._opts.totalSteps,
            node = this.get('_renderNodes').childNodes[0]
        if(active >= total) {
          this._opts.active = 0
          for(var i = 0; i < total; i++) {
            node.childNodes[i].removeAttribute('class')
          }
        } else {
          node.childNodes[this._opts.active].setAttribute('class', 'is-success')
          this._opts.active ++
        }
      }
    }
  },
  _opts: {
    template:  '<script type="text/template" id="steps"><div class="steps"><ul></ul><div><button id="statusChange">下一步</button></div></div></script>'
  },
  setUp() {
    var ts = this._opts.titles,
        lens = ts.length,
        t = this._opts.template,
        s = '<ul>'
    this._opts.totalSteps = lens
      for(let i = 0; i < lens; i++) {
        s += '<li>' + ts[i] + '</li>'
      }
      s+='</ul>'
      t = t.replace(/<ul>.*<\/ul>/gi, s)
      this._opts.template = t
      this.render(this._opts)
  }
})