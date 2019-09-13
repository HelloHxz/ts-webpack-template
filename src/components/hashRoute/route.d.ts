export interface IRoute {
  init(initPrps: RouteInitProperty): void;
}

export interface RouteInitProperty {
     name:string;
}
