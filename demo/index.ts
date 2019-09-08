import Config from './config';
import { Button } from 'star-web';

const helloTS:string = 'xxxxx';

console.log(Button)

new Button({
    title: '',
    disabled: false
});
const helloFunc = function(first:string, second:number):string {
    return `${first}_${second}_${Config.title}`;
}
alert(helloFunc(helloTS,2));