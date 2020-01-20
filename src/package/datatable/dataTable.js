import { base } from '../utils/base.js'

export  var DataTable = base.extend({
    events: {
  //    'button': {
  //      'click': function(e) {
  //        let active = this._opts.active,
  //            total = this._opts.totalSteps,
  //            node = this.get('_renderNodes').childNodes[0]
  //        if(active >= total) {
  //          this._opts.active = 0
  //          for(var i = 0; i < total; i++) {
  //            node.childNodes[i].removeAttribute('class')
  //          }
  //        } else {
  //          node.childNodes[this._opts.active].setAttribute('class', 'is-success')
  //          this._opts.active ++
  //        }
  //      }
  //    }
    },
    _opts: {
      template:  '<table class="beautify-table table-hover" style="width:100%">'
                  + '<thead class="thead">'
                    + '<% _.each(data.titles, function(n){ %>'
                    + ' <th class="th"><%= n %></th>'
                    + '<% }); %>'
                  + '</thead>'
                  +'<tbody class="tbody" >'
                    + '<% _.each(data.data, function(n){ %>'
                    + '<tr class="tr">'
                       + '<%_.each(n, function(m){ %>'
                         +'<td class="td"><%= m %></td>'
                       +'<% }); %>'
                    + '</tr>'
                    + '<% }); %>'
                  +'</tbody>'
                 +'</table>'
    },
    setUp() {
       this.render(this._opts);
    }
  })