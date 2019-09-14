export interface RegisterRouteProperty {
  wrapper: HTMLElement,
  pages: JSONProperty,
}
export interface JSONProperty {
  [key: string]: any;
}

export default abstract class AbstractRoute {
  static register = (props:RegisterRouteProperty):void => {
  }
  // abstract registeRoute():void;
}