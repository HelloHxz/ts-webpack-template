import Box, { BoxProperty } from './box';
import { JSONProperty } from '../props';

export interface BoxLayoutProperty {
  direction: 'vertical' | 'horizontal';
  children: BoxProperty[];
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
