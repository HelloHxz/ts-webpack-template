import AbstractRoute from '../../common/route';
import { RegisterRouteProperty, RouteInitProps, IRouteInfo, JSONProperty } from '../../common/props';
import RouteUtils from '../../common/route/utils';


class HashRoute extends AbstractRoute {
  static rootRoute: HashRoute;

  static push = (path, query:JSONProperty) => {
    window.location.hash = RouteUtils.combinePathAndQuery(path, query);
  };

  static register = (props: RegisterRouteProperty): void => {
    const { wrapper } = props;
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
    const GlobalPage = RouteUtils.getGlobalPageClass();
    if(GlobalPage) {
      wrapper.append(new GlobalPage({route: HashRoute.rootRoute}).render());
    } else {
      wrapper.append(HashRoute.rootRoute.render());
    }
 
  };
  constructor(props: RouteInitProps) {
    super(props);
    this.routeInfo = this.getRouteInfo();
    if (this.props.route) {
      this.props.route.childRoute = this;
    }
  }

  getRouteInfo = (): IRouteInfo => {
    let path:string = '';
    if (!this.props.route) {
      path = RouteUtils.getPathFromUrl();
    } else {
      if (this.props.route.routeInfo) {
        path = this.props.route.routeInfo.remainPath;
      }
    }
    return RouteUtils.convertPathToRouteInfo(path);
  };

  reRender = () => {
    const reRenderRouteInfo = this.getRouteInfo();
    if (reRenderRouteInfo.pageName !== this.routeInfo.pageName) {
      this.routeInfo = reRenderRouteInfo;
      this.render();
    } else {
      this.routeInfo = reRenderRouteInfo;
      if (this.childRoute) {
        this.childRoute.routeInfo = (this.childRoute as HashRoute).getRouteInfo();
        (this.childRoute as HashRoute).render();
      }
    }
  };

  render = () => {
    this.root.empty();
    if (this.routeInfo) {
      this.root.append(new this.routeInfo.PageClass({ route: this }).render());
    }
    return this.root;
  };
}

export default HashRoute;
