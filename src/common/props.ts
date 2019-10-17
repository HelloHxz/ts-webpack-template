import Route from './route';

  export interface JSONProperty {
    [key: string]: any;
  }
  
  export interface URLInfo {
    href: string;
    hash: string;
    pathname: string;
    routeSeed: number;
    routeKey: string;
    query: JSONProperty;
  }
  
  export interface RouteInitProps {
    route?: Route;
    isRoot?: boolean;
  }
  
  export interface RegisterRouteProperty {
    wrapper: JQuery<HTMLElement>;
    pages: JSONProperty;
    root: string;
    routeSeedKey?: string;
  }
  
  export interface IRouteInfo {
    PageClass: any;
    remainPath: string;
    pageName: string;
    urlInfo?: URLInfo,
  }
  