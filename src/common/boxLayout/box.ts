export interface BoxProperty {
  direction: 'vertical' | 'horizontal';
  size: number | string;
  className?: string;
  index: number;
  render: ({ wrapper }) => JQuery<HTMLElement> | null | void;
}

class Box {
  props: BoxProperty;
  root: JQuery<HTMLElement>;
  inner: JQuery<HTMLElement>;
  constructor(props: BoxProperty) {
    this.props = props;
    const shortMark = props.direction === 'horizontal' ? 'h' : 'v';
    const className = [`xz-${shortMark}-box`];
    this.root = $(`<div class='${className.join(' ')}'/>`);
    this.inner = $(`<div class='xz-${shortMark}-box-inner'/>`);
    this.root.append(this.inner);
  }
  setStyle = (styles) => {
    this.root.css(styles);
  };
  render = (): JQuery<HTMLElement> => {
    const { render } = this.props;
    const re = render({ wrapper: this.inner });
    if (re) {
      this.inner.append(re);
    }
    return this.root;
  };
}

export default Box;
