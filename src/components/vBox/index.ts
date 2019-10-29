import BoxLayout from '../../common/boxLayout';

export interface VBoxLayoutProperty {
  children: VBoxProperty[];
}

export interface VBoxProperty {
  height: number;
}


class VBoxLayout extends BoxLayout {
  constructor(props: VBoxLayoutProperty) {
    super({
      ...props,
      ...{
        direction: 'vertical',
        children: [ { size: 12, direction:'vertical' }]
      },
    });
  }
}

export default VBoxLayout;
