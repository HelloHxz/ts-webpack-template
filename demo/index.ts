import $ from 'jquery';
import { Button, HBoxLayout, HashRoute } from 'star-web';
import Config from './config';
import './index.less';


window.onload = () => {
  HashRoute.register({
    wrapper: $(document.body),
    root: 'home/list',
    pages:{
        '/': require('./pages/root'),
        'home': require('./pages/home'),
        'list': require('./pages/list'),
        'detail': require('./pages/detail'),
        'second': require('./pages/second'),
    },
  });
}

// const helloTS:string = 'xxxxx';

// console.log(Button)

// new Button({
//     title: '',
//     disabled: false
// });

// const H = new HBoxLayout({
//   children: [
//     new HBoxLayout.Box({
//       width: 100,
//     }),
//     new HBoxLayout.Box({
//       width: 'auto',
//     }),
//     new HBoxLayout.Box({
//       width: 100,
//     }),
//   ],
// });

// document.body.appendChild(H.root);

// import(/* webpackChunkName: "lazyload" */'./lazyLoad').then((C)=>{
//     console.log(C.default);
// }).catch(()=>{});