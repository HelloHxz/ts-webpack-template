import { HashRoute, ToolTip } from 'star-web';

class ListPage {
  root: JQuery<HTMLElement>;
  props: any;
  constructor(props) {
    this.props = props;
    this.root = $('<div class="demo-page"></div>');
  }
  render = () => {
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

    const toolTipArea = new ToolTip({
      render:():JQuery<HTMLElement> => {
        return this.root;
      }
    });
    return toolTipArea.render();
  }
}

export default ListPage;