import './index.less';

export interface ToolTipPerperty {
  render: () => JQuery<HTMLElement>;
  action?: 'hover' | 'click' | 'rightclick' | 'dblclick';
}

class ToolTip {
  props: ToolTipPerperty;
  isDisabled: boolean = false;
  constructor(props: ToolTipPerperty) {
    this.props = props;
  }

  setDisabled = (isDisabled: boolean):void => {
    this.isDisabled = isDisabled;
  }

  render = (): JQuery<HTMLElement> => {
    const renderMethod = this.props.render;
    if(renderMethod) {
      const root = renderMethod();
      root.bind('click', (e)=> {
        e.preventDefault();
        e.stopPropagation();
        alert("s");
      });
      return root;
    }
    return $('<div />');
  }
}

export default ToolTip;
