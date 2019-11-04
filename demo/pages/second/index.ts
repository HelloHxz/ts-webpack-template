import { Button,HashRoute } from 'star-web';


class SecondPage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {
    console.log('render secondpage');
    this.root = $('<div>Second</div>');
    this.root.append(new HashRoute(this.props).render());
    return this.root;
  }
}

export default SecondPage;