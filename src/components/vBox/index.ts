import BoxLayout, { VBoxLayoutProperty } from '../../common/boxLayout';


class VBoxLayout extends BoxLayout {
  constructor(props: VBoxLayoutProperty) {
    super({
      ...props,
      ...{
        direction: 'vertical',
      },
    });
  }
}

export default VBoxLayout;
