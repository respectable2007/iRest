import '../steps/steps.js';
((window,document) => {
  let div = document.createElement('div');
  div.innerHTML = '<div><button id="statusChange">下一步</button></div><script type="text/template" id="steps"><div class="steps"><ul><li >等待</li><li>面试中</li><li>面试结束</li></ul></div></script>';
  document.body.appendChild(div);
  var data = {
    tmpId: 'steps',
    active: 0
  }, 
  mySteps = new Steps(data);
  document.getElementById('statusChange').addEventListener('click', function() {
    data.active ++;
    var steps = document.getElementsByClassName('steps')[0],
        lis = steps.getElementsByTagName('li');
    for(var i = 0, lens = lis.length; i < lens; i++) {
        lis[i].className = '';
    }
    if(typeof lis[data.active] !== 'undefined') {
      lis[data.active].className = 'active';
    }
  },false)
})(window,document)