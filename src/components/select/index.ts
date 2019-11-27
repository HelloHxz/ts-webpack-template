import { PopView } from 'star-web';
import { JSONProperty } from '../../common/props';
import './index.less';

/*
   const selectInstance = new Select({
     data: () => {

     }
   });
   const $_select:JQuery<HTMLElement> = selectInstance.render();
   $(document.body).append($_select);
*/

export interface SelectProperty {
  data: (() => Array<JSONProperty>) | Array<JSONProperty>;
  className?: string;
}

class Select {
  root: JQuery<HTMLElement>;
  popViewInstance: PopView;
  hasInited = false;
  constructor(props: SelectProperty) {
    const className = [`star-select`];
    this.root = $(`<div class='${className.join(' ')}'>xxxx</div>`);
    this.popViewInstance = new PopView({
      placement: 'bottom',
      renderContent: () => {
        return $('<span style="color:#fff;background:black;border-radius:3px;padding:5px">asdasdasdasdasd</span>');
        // return $('<div style="width:210px;height:250px;border:1px solid #bbb">asdasdasdasdasd</div>');
      },
      render: () => {
        return this.root;
      },
    });
    this.bindEvent();
  }

  private bindEvent = () => {
    this.root.bind('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.popViewInstance.showByTargetElement(this.root);
    });
  };

  show = () => {};

  hide = () => {};

  destory = () => {};

  render = () => {
    if (this.hasInited) {
      return this.root;
    }
    this.hasInited = true;
    return this.popViewInstance.render();
  };
}

export default Select;
