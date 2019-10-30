import './index.less';

export interface PopViewShowProperty {
  placement: 'top' | 'bottom' | 'left' | 'right';
  render: () => JQuery<HTMLElement>;
}

class PopView {
  root: JQuery<HTMLElement>;
  constructor() {
    this.root = $(`<div></div>`);
  }

  show = () => {};

  showByTarget = (target) => {};

  showByRect = () => {};

  hide = () => {};

  destory = () => {};
}

export default PopView;
