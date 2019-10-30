import './index.less';
export interface ButtonProperty {
  title?: string;
  disabled?: boolean;
  className?: string | Function;
}

class Button {
  root: JQuery<HTMLElement>;
  public props: ButtonProperty;
  constructor(props: ButtonProperty) {
    this.props = props;
    const { title } = props;
    this.root = $(`<div>${title || 'xx'}</div>`);
  }
}

export default Button;
