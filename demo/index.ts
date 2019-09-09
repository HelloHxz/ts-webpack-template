import { Button } from 'star-web';
import Config from './config';
import './index.less';

const helloTS:string = 'xxxxx';

console.log(Button)

new Button({
    title: '',
    disabled: false
});
const helloFunc = function(first:string, second:number):string {
    document.body.className = 'test';
    return `${first}_${second}_${Config.title}`;
}
alert(helloFunc(helloTS,2));

import(/* webpackChunkName: "lazyload" */'./lazyLoad').then((C)=>{
    console.log(C.default);
}).catch(()=>{});