import '../steps';
((document) => {
  let div = document.createElement('div');
  div.innerHTML = '<script type="text/template" id="steps"><div class="steps"><ul><li >等待</li><li>面试中</li><li>面试结束</li></ul><div><button id="statusChange">下一步</button></div></div></script>';
  document.body.appendChild(div);
  var data = {
    tmpId: 'steps',
    active: 0
  }, 
  mySteps = new Steps(data);
})(document)