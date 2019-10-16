import { JSONProperty, IRouteInfo, RouteInitProps, RegisterRouteProperty } from '../props';

export default abstract class AbstractRoute {
  routePath = '';
  props: RouteInitProps;
  curRouteInfo: IRouteInfo | null = null;
  root: JQuery<HTMLElement>;
  static register = (props: RegisterRouteProperty): void => {};
  // 刷新页面
  refresh = (): void => {};
  constructor(props: RouteInitProps) {
    this.props = props;
    // RouteUtils.init({});
    this.root = $("<div class='star-route-wrapper'/>");
  }
}
