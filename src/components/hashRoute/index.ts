import AbstractRoute from '../../common/route';
import { RegisterRouteProperty, RouteInitProps, IRouteInfo } from '../../common/props';
import RouteUtils from '../../common/route/utils';

class HashRoute extends AbstractRoute {
  static rootRoute: HashRoute;
  static register = (props: RegisterRouteProperty): void => {
    const { wrapper, pages } = props;
    RouteUtils.init(props);
    HashRoute.rootRoute = new HashRoute({ isRoot: true });
    $(window).bind('hash', () => {});
    const path = RouteUtils.getPathFromUrl();
    if (RouteUtils.routeConfig) {
      if (path === '') {
        window.location.replace(window.location.href + '#' + RouteUtils.routeConfig.root);
        window.location.reload();
        return;
      }
    }
    HashRoute.rootRoute.render();
    wrapper.append(HashRoute.rootRoute.root);
  };
  constructor(props: RouteInitProps) {
    super(props);
    this.initLayout();
    let path = '';
    if (!this.props.parentRoute) {
      path = RouteUtils.getPathFromUrl();
    } else {
      if (this.props.parentRoute.curRouteInfo) {
        path = this.props.parentRoute.curRouteInfo.remainPath;
      }
    }
    this.curRouteInfo = RouteUtils.convertPathToRouteInfo(path);
  }

  initLayout = () => {};

  render = () => {
    if (this.curRouteInfo) {
      this.root.append(new this.curRouteInfo.PageClass({ parentRoute: this }).render());
    }
    return this.root;
  };
}

export default HashRoute;
