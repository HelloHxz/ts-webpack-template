import BoxLayout, { Box } from '../../common/boxLayout';

export interface HBoxLayoutProperty {
  children: HBox[];
}

export interface HBoxProperty {
  width: number;
}

class HBox extends Box {
  constructor(props: HBoxProperty) {
    super({
      ...props,
      ...{
        direction: 'horizontal',
        size: props.width,
      },
    });
  }
}

class HBoxLayout extends BoxLayout {
  static Box: any = HBox;
  constructor(props: HBoxLayoutProperty) {
    super({
      ...props,
      ...{
        direction: 'horizontal',
      },
    });
  }
}

export default HBoxLayout;
