import { HashRoute } from 'star-web';

class ListPage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {
    this.root = $('<div>List</div>');
    const BTN = $('<button>home/detail</button>');
    BTN.bind('click', () => {
      HashRoute.push('home/detail', {});
    });
    this.root.append(BTN);
    const BTN2 = $('<button>detail</button>');
    BTN2.bind('click', () => {
      HashRoute.push('detail', {});
    });
    this.root.append(BTN2);
    const BTN3 = $('<button>NotFound</button>');
    BTN3.bind('click', () => {
      HashRoute.push('home/detail2', {});
    });
    this.root.append(BTN3);
    return this.root;
  }
}

export default ListPage;