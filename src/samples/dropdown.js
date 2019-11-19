import '../package/dropdown';
(() => {
  new DropDown({
    header: '<button type="button">下拉菜单</button>',
    item: [{label:'黄金糕', command: 'a'}, {label:'狮子头', command: 'b'}, 
           {label:'螺蛳粉',command: 'c'}, {label:'双皮奶',command: 'd'}, 
           {label:'蚵仔煎',command: 'e'}],
    //点击菜单项触发的事件回调
    command: function(command) {
      console.log(command);
    },
    //下拉框出现/隐藏时触发	出现则为 true，隐藏则为 false
    visibleChange: function(value) {
      console.log(value)
    }
  })
})()