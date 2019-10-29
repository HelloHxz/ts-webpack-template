import { HashRoute, HBoxLayout, VBoxLayout } from 'star-web';

class HomePage {
  root: JQuery<HTMLElement> = $('<div class="demo-page"></div>');
  props: any;
  constructor(props) {
    this.props = props;
  }

  getMainBottomContent = ():JQuery<HTMLElement> => {
    const hBoxInstance:HBoxLayout = new HBoxLayout({
      children: [{ width:30, render: ({ }) => {
        return $('<div />');
      } }, { width:'auto', render: () => {
        return this.getRouteContent();
      } }, { width:100, render: () => {
        return null;
      } }]
    });
    return hBoxInstance.render();
  }

  getRouteContent = ():JQuery<HTMLElement> => {
    return new HashRoute(this.props).render();
  }

  render = (): JQuery<HTMLElement> => {
    const mainVBox = new VBoxLayout({
      children: [
        {
          height: 100, render: () => {

          }
        },
        {
          height: 'auto', render: () => {
            return this.getMainBottomContent();
          }
        }
      ]
    });
    this.root.append(mainVBox.render());
    return this.root;
  }
}

export default HomePage;