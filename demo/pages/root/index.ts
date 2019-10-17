class RootPage {
  props: any;
  route: any;
  loadingState: string;
  root: JQuery<HTMLElement>;
  constructor(props) {
    this.props = props;
    this.route = props.route;
    this.loadingState = 'loading';
    this.root = $('<div class="global-root"/>');
    this.loadDataFromServer();
  }

  loadDataFromServer = () => {
    setTimeout(()=>{
      this.loadingState = 'success';
      this.render();
    },1000);
  }
  render() {
    this.root.empty();
    if(this.loadingState === 'loading') {
      this.root.append($("<div>loading...</div>"));
    } else if(this.loadingState === 'success') {
      this.root.append(this.route.render());
    } else if(this.loadingState === 'error') {
      this.root.append($("<div>加载失败</div>"));
    }
    return this.root;
  }
}

export default RootPage;