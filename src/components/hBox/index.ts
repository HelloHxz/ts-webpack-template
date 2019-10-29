import BoxLayout from '../../common/boxLayout';

export interface HBoxLayoutProperty {
  children: HBoxProperty[];
}

export interface HBoxProperty {
  width: number | string; 
  render: ({ box }) => JQuery<HTMLElement> | null
}

class HBoxLayout extends BoxLayout {
  constructor(props: HBoxLayoutProperty) {
    super({
      ...props,
      ...{
        direction: 'horizontal',
        children: [{ size: 12, direction:'horizontal' }]
      },
    });
  }
}


export default HBoxLayout;
