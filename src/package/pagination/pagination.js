import { base } from '../utils/base.js'
export  var pagination = base.extend({
    events: {
      'a': {
        'click': function(e) {
          var cur = e.target.parentNode,
              index = e.target.getAttribute('data-index'),
              disabled = e.target.getAttribute('disabled'),
              label = e.target.getAttribute('aria-label'),
              childNodes = cur.parentNode.childNodes;
          if (disabled == 'disabled' || label == 'nextMore' || label == 'prevMore') {
            return false;
          }
          //点击上一页
          if( label == 'Previous') {
            if(this._opts.currentPage > 1) {
              this._opts.currentPage -= 1;
              //点击页是标准页数-3、标准页数+4、第1页、最后一页时，需要重新渲染分页
              if(this._opts.currentPage == (this._opts.index - 3) || this._opts.currentPage == (this._opts.index + 4) || this._opts.currentPage == 1 || this._opts.currentPage == this._opts.lens) {
                //更新标准页为当前点击页
                this._opts.index = this._opts.currentPage;
                this.setChunkData();
              }
            } else {
              return false;
            }
          }
          //点击下一页
          if( label == 'Next') {
              if(this._opts.currentPage < this._opts.data.slice(-1)[0]) {
                this._opts.currentPage += 1;
                //点击页是标准页数-3、标准页数+4、第1页、最后一页时，需要重新渲染分页
                if(this._opts.currentPage == (this._opts.index - 3) || this._opts.currentPage == (this._opts.index + 4) || this._opts.currentPage == 1 || this._opts.currentPage == this._opts.lens) {
                  //更新标准页为当前点击页
                  this._opts.index = this._opts.currentPage;
                  this.setChunkData();
                }
              } else {
                return false;
              }
          }
          //点击当前页
          if( index ) {
            if(this._opts.currentPage == parseInt(index)) {
              return;
            }
            this._opts.currentPage = parseInt(index);
            //点击页是标准页数-3、标准页数+4、第1页、最后一页时，需要重新渲染分页
            if(index == (this._opts.index - 3) || index == (this._opts.index + 4) || index == 1 || index == this._opts.lens) {
              //更新标准页为当前点击页
              this._opts.index = this._opts.currentPage;
              this.setChunkData();
            }
          }
          for(var i = 1; i < childNodes.length - 1; i++) {
            childNodes[i].removeAttribute('class');
            if(childNodes[i].childNodes[0].getAttribute('data-index') == this._opts.currentPage ) {
              childNodes[i].setAttribute('class', 'active');
            }
          }
          //激发自定义事件current-page
          if(this['_listener']) {
            var fn =  this['_listener']['current-page'];
            if(fn.length > 0) {
              this.fire('current-page', this._opts.currentPage);
            }
          }
        }
      }
    },
    _opts: {
      template:  '<div class="pager-container"><span class="total">共<%- data.total%>条</span>'
                + '<ul class="pagination">'
                   + '<li>'
                   + '<%if(data.data.length <= 1){%>'
                     + '<a href="javascript:void(0)" aria-label="Previous" disabled>&laquo;</a>'
                   + '<%};%>'
                   + '<%if(data.data.length > 1){%>'
                     + '<a href="javascript:void(0)" aria-label="Previous">&laquo;</a>'
                   + '<%};%>'
                   + '</li>'
                   + '<%_.each(data.data, function(m){ %>'
                     + '<%if(data.currentPage == m){%>'
                      + '<li class="page-item active"><a href="javascript:void(0)" data-index="<%- m %>"><%= m %></a></li>'
                     + '<%}%>'
                     + '<%if(data.currentPage != m){%>'
                        // 向后
                        + '<%if(data.isForward == true){%>'
                            + '<%if(m == data.currentPage - 1){%>'
                               +'<li class="page-item"><a href="javascript:void(0)" aria-label="prevMore">...</a></li>'
                            + '<%}%>'
                            + '<%if((m > data.currentPage && m < data.currentPage + 5) || m == data.lens || m == 1){%>'
                               +'<li class="page-item"><a href="javascript:void(0)" data-index="<%- m %>"><%= m %></a></li>'
                            + '<%}%>'
                            + '<%if(m == data.lens - 1){%>'
                               +'<li class="page-item"><a href="javascript:void(0)" aria-label="nextMore">...</a></li>'
                            + '<%}%>'
                        + '<%}%>'
                           // 标准页上一页且标准页-4大于1时，显示为...
                           + '<%if(m == data.currentPage - 4 && data.currentPage - 4 > 1){%>'
                              +'<li class="page-item"><a href="javascript:void(0)" aria-label="prevMore">...</a></li>'
                           + '<%}%>'
                           // 标准页-3到标准页+5间，显示页码
                           + '<%if((m > data.currentPage - 4 && m < data.currentPage + 5) || m == data.lens || m == 1){%>'
                              +'<li class="page-item"><a href="javascript:void(0)" data-index="<%- m %>"><%= m %></a></li>'
                           + '<%}%>'
                           // 尾页-1且标准页+4小于页数时，显示为...
                           + '<%if(m == data.lens - 1 && data.currentPage + 4 < data.lens){%>'
                              +'<li class="page-item"><a href="javascript:void(0)" aria-label="nextMore">...</a></li>'
                           + '<%}%>'
                     + '<%}%>'
                   +'<% }); %>'
                   + '<li>'
                   + '<%if(data.data.length <= 1){%>'
                     + '<a href="javascript:void(0)" aria-label="Next" disabled>&raquo;</a>'
                   + '<%};%>'
                   + '<%if(data.data.length > 1){%>'
                     + '<a href="javascript:void(0)" aria-label="Next">&raquo;</a>'
                   + '<%};%>'
                   + '</li>'
                 + '</ul></div>',
      pageSize: 10,
      total: 0,
      currentPage: 1
    },
    setUp() {
      this.initOptions();
      this.render(this._opts);
    },
    initOptions() {
      var total = this._opts.total,
            size = this._opts.pageSize,
            lens = Math.floor(total / size) + ((total % size > 0) ? 1 : 0),
            arr = [];
        for(var i = 1 ; i <= lens; i++) {
          arr.push(i);
        }
        //上一次渲染分页的标准页，默认为1
        this._opts.index = 1;
        //分页数组
        this._opts.data = arr;
        //分页总数
        this._opts.lens = lens;
    }
  })