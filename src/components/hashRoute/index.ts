import AbstractRoute from '../../common/route';
import { RegisterRouteProperty, RouteInitProps, IRouteInfo } from '../../common/props';
import RouteUtils from '../../common/route/utils';

class HashRoute extends AbstractRoute {
  static rootRoute: HashRoute;

  static push = (path, query) => {
    window.location.hash = RouteUtils.combinePathAndQuery(path, query);
  };

  static register = (props: RegisterRouteProperty): void => {
    const { wrapper, pages } = props;
    RouteUtils.init(props);
    HashRoute.rootRoute = new HashRoute({ isRoot: true });
    $(window).bind('hashchange', () => {
      HashRoute.rootRoute.reRender();
    });
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
    this.routeInfo = this.getrouteInfo();
    if (this.props.parentRoute) {
      this.props.parentRoute.childRoute = this;
    }
  }

  initLayout = () => {};

  getrouteInfo = (): IRouteInfo => {
    let path = '';
    if (!this.props.parentRoute) {
      path = RouteUtils.getPathFromUrl();
    } else {
      if (this.props.parentRoute.routeInfo) {
        path = this.props.parentRoute.routeInfo.remainPath;
      }
    }
    return RouteUtils.convertPathToRouteInfo(path);
  };

  reRender = () => {
    const reRenderRouteInfo = this.getrouteInfo();
    if (reRenderRouteInfo.pageName !== this.routeInfo.pageName) {
      this.routeInfo = reRenderRouteInfo;
      this.render();
    } else {
      this.routeInfo = reRenderRouteInfo;
      if (this.childRoute) {
        this.childRoute.routeInfo = (this.childRoute as HashRoute).getrouteInfo();
        (this.childRoute as HashRoute).render();
      }
    }
  };

  render = () => {
    this.root.empty();
    if (this.routeInfo) {
      this.root.append(new this.routeInfo.PageClass({ parentRoute: this }).render());
    }
    return this.root;
  };
}

export default HashRoute;
