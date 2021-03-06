import { HashRoute, HBoxLayout, VBoxLayout } from 'star-web';

class HomePage {
  root: JQuery<HTMLElement> = $('<div class="demo-page"></div>');
  props: any;
  constructor(props) {
    this.props = props;
  }

  private getMainBottomContent = ():JQuery<HTMLElement> => {
    const hBoxInstance:HBoxLayout = new HBoxLayout({
      children: [{ width:150, render: ({ wrapper }) => {
        wrapper.css({borderRight:'1px solid #ddd'});
        return $('<div />');
      } }, { width:'auto', render: ({ }) => {
        return this.getRouteContent();
      } }, { width:146, render: ({ wrapper }) => {
        wrapper.css({borderLeft:'1px solid #ddd'});
        return null;
      } }]
    });
    return hBoxInstance.render();
  }

  private getRouteContent = ():JQuery<HTMLElement> => {
    return new HashRoute(this.props).render();
  }

  render = (): JQuery<HTMLElement> => {
    console.log('render homepage');
    const mainVBox = new VBoxLayout({
      children: [
        {
          height: 45, render: ({ wrapper }) => {
            wrapper.css({backgroundColor:'#eee'});
          }
        },
        {
          height: 'auto', render: () => {
            return this.getMainBottomContent();
          }
        },
        {
          height: 24, render: ({ wrapper }) => {
            wrapper.css({borderTop:'1px solid #ddd'});
          }
        }
      ]
    });
    this.root.append(mainVBox.render());
    return this.root;
  }
}

export default HomePage;