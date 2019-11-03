import { Button,HashRoute } from 'star-web';


class DetailPage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {

    this.root = $('<div>Detail</div>');
    const BTN4 = $('<button>home/second/list</button>');
    BTN4.bind('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      HashRoute.push('home/second/list', {});
    });
    this.root.append(BTN4);
    return this.root;
  }
}

export default DetailPage;