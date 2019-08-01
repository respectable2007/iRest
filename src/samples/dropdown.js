import '../dropdown';
(() => {
  new DropDown({
    header: '<button type="button">下拉菜单</button>',
    item: [{label:'黄金糕', command: 'a'}, {label:'狮子头', command: 'b'}, 
           {label:'螺蛳粉',command: 'c'}, {label:'双皮奶',command: 'd'}, 
           {label:'蚵仔煎',command: 'e'}],
    command: function(command) {
      console.log(command);
    }
  })
})()