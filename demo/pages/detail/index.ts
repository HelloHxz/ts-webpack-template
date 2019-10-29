import { Button } from 'star-web';


class DetailPage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {

    this.root = $('<div>Detail</div>');
    const btn:Button = new Button({});
    this.root.append(btn.root);
    return this.root;
  }
}

export default DetailPage;