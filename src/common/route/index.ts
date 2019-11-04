import { JSONProperty, IRouteInfo, RouteInitProps, RegisterRouteProperty } from '../props';
import './index.less';

export default abstract class AbstractRoute {
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
    this.props =    props;
    this.root = $("<div class='star-route-wrapper'/>");
  }
}
