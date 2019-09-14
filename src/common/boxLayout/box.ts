class Box {
  props: BoxProperty;
  constructor(props: BoxProperty) {
    this.props = props;
    console.log(">>");
    console.log(props);
  }

  public _setLayout = ():void => {

  }
}

export interface BoxProperty {
  direction: 'vertical' | 'horizontal';
  size: number | string;
}

export default Box;
