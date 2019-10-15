import AbstractRoute from '../../common/route';
import { RegisterRouteProperty, RouteInitProps } from '../../common/props';

class HashRoute extends AbstractRoute {
  static rootRoute: HashRoute;
  static register = (props: RegisterRouteProperty): void => {
    const { wrapper, pages } = props;
    HashRoute.rootRoute = new HashRoute({});
    wrapper.append(HashRoute.rootRoute.root);
    $(window).bind('hash', () => {});
  };
  constructor(props: RouteInitProps) {
    super(props);
    this.initLayout();
  }

  initLayout = () => {};
}

export default HashRoute;
