import Config from './config';
import { Button } from '../src/components';
const helloTS:string = 'xxxxx';
console.log(Button)
const helloFunc = function(first:string, second:number):string {
    return `${first}_${second}_${Config.title}`;
}
alert(helloFunc(helloTS,2));