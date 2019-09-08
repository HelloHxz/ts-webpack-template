import Config from './config';

const helloTS:string = 'xxxxx';

const helloFunc = function(first:string, second:number):string {
    return `${first}_${second}_${Config.title}`;
}
alert(helloFunc(helloTS,2));