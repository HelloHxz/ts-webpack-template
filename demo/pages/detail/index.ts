
class DetailPage {
  root: JQuery<HTMLElement> | null = null;
  props: any;
  constructor(props) {
    this.props = props;
  }
  render = () => {
    this.root = $('<div>Detail</div>');
    return this.root;
  }
}

export default DetailPage;