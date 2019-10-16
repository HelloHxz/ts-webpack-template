import { JSONProperty, IRouteInfo, RouteInitProps, RegisterRouteProperty } from '../props';

export default abstract class AbstractRoute {
  routePath = '';
  props: RouteInitProps;
  childRoute?: AbstractRoute;
  routeInfo: IRouteInfo;
  root: JQuery<HTMLElement>;
  static register = (props: RegisterRouteProperty): void => {};
  constructor(props: RouteInitProps) {
    this.routeInfo = {
      PageClass: null,
      pageName: '',
      remainPath: '',
    };
    this.props = props;
    // RouteUtils.init({});
    this.root = $("<div class='star-route-wrapper'/>");
  }
}
