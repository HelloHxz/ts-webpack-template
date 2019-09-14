class Box {
  props: BoxProperty;
  constructor(props: BoxProperty) {
    this.props = props;
  }
}

export interface BoxProperty {
  direction: 'vertical' | 'horizontal';
  size: number;
}

export default Box;
