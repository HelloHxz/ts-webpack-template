import BoxLayout, { Box } from '../../common/boxLayout';

export interface VBoxLayoutProperty {
  children: VBox[];
}

export interface VBoxProperty {
  height: number;
}

class VBox extends Box {
  constructor(props: VBoxProperty) {
    super({
      ...props,
      ...{
        direction: 'vertical',
        size: props.height,
      },
    });
  }
}

class VBoxLayout extends BoxLayout {
  static Box: any;
  constructor(props: VBoxLayoutProperty) {
    super({
      ...props,
      ...{
        direction: 'vertical',
      },
    });
  }
}

VBoxLayout.Box = VBox;

export default VBoxLayout;
