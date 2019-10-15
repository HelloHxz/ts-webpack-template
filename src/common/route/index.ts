import { JSONProperty, RouteInitProps, RegisterRouteProperty } from '../props';
import RouteUtils from './utils';

export default abstract class AbstractRoute {
  routePath = '';
  props: RouteInitProps;
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
