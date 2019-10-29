import BoxLayout, { HBoxLayoutProperty } from '../../common/boxLayout';

class HBoxLayout extends BoxLayout {
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
