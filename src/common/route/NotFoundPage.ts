export default class NotFoundPage {
  props: any;
  constructor(props) {
    this.props = props;
  }
  render() {
    const { route } = this.props;
    const { routeInfo } = route;
    const { pageName } = routeInfo;
    return $(`<div>${pageName} Not Found</div>`);
  }
}
