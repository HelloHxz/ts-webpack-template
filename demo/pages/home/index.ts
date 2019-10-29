import { HashRoute, HBoxLayout } from 'star-web';

class HomePage {
  root: JQuery<HTMLElement> = $('<div>HOME</div>');
  props: any;
  constructor(props) {
    this.props = props;
    console.log(this.props);
  }
  render = () => {
    const HBox = new HBoxLayout({
      children: [{ width:30, render: ({ }) => {
        return $('<div />');
      } }, { width:'auto', render: () => {
        return $('<div />');
      } }, { width:100, render: () => {
        return null;
      } }]
    });
    this.root.append(new HashRoute(this.props).render());
    return this.root;
  }
}

export default HomePage;