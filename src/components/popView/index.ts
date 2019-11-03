import './index.less';

export interface PopViewProperty {
  placement: 'top' | 'bottom' | 'left' | 'right';
  render: () => JQuery<HTMLElement>;
  renderContent: () => JQuery<HTMLElement>;
}

class PopView {
  root: JQuery<HTMLElement>;
  inner: JQuery<HTMLElement>;
  props: PopViewProperty;
  positionMode: 'absolute' | 'fixed' = 'absolute';
  hasInited = false;
  constructor(props: PopViewProperty) {
    this.props = props;
    this.root = $(`<div class='star-popview-absolute'></div>`);
    this.inner = $(`<div>assssssss</div>`);
    this.root.append(this.inner);
  }

  show = (params) => {};

  private getBoundingClientRect = (target: JQuery<HTMLElement>) => {
    const targetDom = $(target)[0];
    if (this.positionMode === 'fixed') {
      return targetDom.getBoundingClientRect();
    }
    const left = targetDom.offsetLeft;
    const top = targetDom.offsetTop;
    const width = targetDom.offsetWidth;
    const height = targetDom.offsetHeight;
    return {
      width,
      height,
      left,
      top,
      bottom: top + height,
      right: left + width,
    };
  };

  showByTargetElement = (target: JQuery<HTMLElement>) => {
    if (!this.hasInited) {
      const targetParent: JQuery<HTMLElement> = target.parent();
      this.hasInited = true;
      targetParent.append(this.root);
    }
    const rect = this.getBoundingClientRect(target);
    //pop-target_parent
    const styles = { top: 0, left: 0 };
    const offset = { x: 0, y: 0 };
    styles.top = parseInt(rect.bottom.toString(), 10) + (offset.y || 0);
    styles.left = parseInt(rect.left.toString()) + (offset.x || 0) + rect.width / 2;
    this.root.css(styles);
    this.inner.addClass('star-popview-animate-bottom');
  };

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
