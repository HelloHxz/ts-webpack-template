import './index.less';
export interface ButtonProperty {
  title?: string;
  disabled?: boolean;
  className?: string | Function;
}

class Button {
  public props: ButtonProperty;
  constructor(props: ButtonProperty) {
    this.props = props;
  }
}

export default Button;
