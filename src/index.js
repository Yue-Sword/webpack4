// import _ from 'lodash'
import { cube } from './math.js'
// import printMe from './print.js'
// import Xml from './assets/data.xml'
import "./assets/style.css"
// import MyImage from './assets/picture.jpg'


function component() {
  var element = document.createElement('div');
  var br = document.createElement('br');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // element.innerHTML = _.join(['hello', 'webpack'], ' ');

  // 样式
  element.classList.add('hello');
  element.appendChild(br);

  // var eleIcon = document.createElement('i');

  // 字体
  // eleIcon.classList.add('iconfont');
  // eleIcon.classList.add('icon-yidongzujianicon');
  // element.appendChild(eleIcon);

  // 图片
  // var myImg = new Image();
  // myImg.src = MyImage;
  // element.appendChild(myImg);

  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = e => {
    import(/* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default;

      print();
    });
  };
  element.appendChild(btn);

  // var elePre = document.createElement('pre');
  // elePre.innerHTML = [
  //   'Hello webpack!',
  //   '5 cubed is equal to ' + cube(5)
  // ].join('\n\n');
  // element.appendChild(elePre);

  return element;
}

var element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component();
//     document.body.appendChild(element);
//   })
// }

// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */'lodash').then(_ => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['hello', 'webpack'], ' ');
//     return element
//   }).catch(error => 'An error occurred while loading the component');
// }

// getComponent().then(component => {
//   document.body.appendChild(component);
// })