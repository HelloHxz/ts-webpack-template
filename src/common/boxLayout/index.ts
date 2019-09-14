import Box, { BoxProperty } from './box';

export interface BoxLayoutProperty {
  direction: 'vertical' | 'horizontal';
  children: Box[];
}

export { Box, BoxProperty };

class BoxLayout {
  props: BoxLayoutProperty;
  root: any;
  constructor(props: BoxLayoutProperty) {
    this.props = props;
    this.initLayout();
  }

  private initLayout = (): void => {
    this.root = document.createElement('div');
  };
}

export default BoxLayout;
