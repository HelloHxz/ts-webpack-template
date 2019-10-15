

import Route from './route';

export interface JSONProperty {
  [key: string]: any;
}

export interface URLInfo {
  href: string,
  hash: string,
  pathname: string,
  routeSeed: Number,
  routeKey: string,
  query: JSONProperty,
}


export interface RouteInitProps {
  parentRoute?: Route,
}


export interface RegisterRouteProperty {
  wrapper: JQuery<HTMLElement>;
  pages: JSONProperty;
  routeSeedKey?: string;
}