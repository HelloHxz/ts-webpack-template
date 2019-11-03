import './index.less';

export interface PopViewShowProperty {
  placement: 'top' | 'bottom' | 'left' | 'right';
  render: () => JQuery<HTMLElement>;
}

class PopView {
  root: JQuery<HTMLElement>;
  props: PopViewShowProperty;
  constructor(props: PopViewShowProperty) {
    this.props = props;
    this.root = $(`<div></div>`);
  }

  show = () => {};

  showByTarget = (target) => {};

  showByRect = () => {};

  hide = () => {};

  destory = () => {};

  render = (): JQuery<HTMLElement> => {
    const { render } = this.props;
    if (render) {
      return render();
    }
    return $('<div>select组件缺少render函数</div>');
  };
}

export default PopView;
