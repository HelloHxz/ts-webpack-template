import { HashRoute } from 'star-web';

class HomePage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {
    this.root = $('<div>HOME</div>');
    this.root.append(new HashRoute(this.props).render());
    return this.root;
  }
}

export default HomePage;