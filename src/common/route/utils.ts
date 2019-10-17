import { JSONProperty, RegisterRouteProperty, URLInfo, IRouteInfo } from '../props';
import NotFoundPage from './NotFoundPage';

class RouteUtils {
  routeSeedKey = '__r';
  routeSeed = 0;
  routeConfig?: RegisterRouteProperty;
  init = (config: RegisterRouteProperty) => {
    this.routeConfig = config;
    this.routeSeedKey = config.routeSeedKey || '__r';
    const initQuery: JSONProperty = this.getQueryFromUrl(null);
    this.routeSeed = this._getRouteSeed(initQuery);
  };
  _getRouteSeed = (query: JSONProperty): number => {
    const _query = query || {};
    let routeSeed = _query[this.routeSeedKey] || 0;
    // eslint-disable-next-line
    if (isNaN(routeSeed)) {
      routeSeed = 0;
    }
    return parseInt(routeSeed, 10);
  };

  getPathFromUrl = (_urlInfo?: URLInfo): string => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const nameArr = urlInfo.hash.split('#');
    const s = nameArr[1];
    if (!s) {
      return '';
    }
    const sArr = s.split('?');
    return sArr[0] || '';
  };

  getGlobalPageClass = () => {
    if(!this.routeConfig) {
      return null;
    }
    const pageClass = this.routeConfig.pages['/'];
    return pageClass ? pageClass.default : null;
  }

  convertPathToRouteInfo = (path: string): IRouteInfo => {
    /*
      const router = {
        home: require('./demo/home/pages/home/page.js'),
        'other/:id': require('./demo/home/pages/home/page.js'),
        'some/somepage': require('./demo/home/pages/somepage/page.js'),
      };
    */
    if (!this.routeConfig) {
      return {
        PageClass: null,
        remainPath: '',
        pageName: '',
      };
    }
    const pathArr = path.split('/');
    const pageName: string = pathArr.shift() || '';
    const PageClass = this.routeConfig.pages[pageName];
    return {
      PageClass: PageClass ? PageClass.default : NotFoundPage,
      remainPath: pathArr.join('/'),
      pageName,
      urlInfo: this.getUrlInfo(),
    };
  };

  getQueryStringFromUrl = (_urlInfo: URLInfo): any => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const Arr = urlInfo.href.split('?');
    if (Arr.length < 2) {
      return null;
    }
    const str = Arr[Arr.length - 1];
    const strArr = str.split('#');
    return strArr[0];
  };

  getQueryFromUrl = (_urlInfo: URLInfo | null): JSONProperty => {
    const urlInfo = _urlInfo || this.getUrlInfo();
    const queryStr = this.getQueryStringFromUrl(urlInfo);
    if (!queryStr) {
      return {};
    }
    let re: {
      [key: string]: string;
    } = {};
    const queryArr = queryStr.split('&');
    for (let i = 0, j = queryArr.length; i < j; i += 1) {
      const keyValueArr = queryArr[i].split('=');
      if (keyValueArr.length === 2) {
        re = re || {};
        const [key, value] = keyValueArr;
        re[key] = decodeURIComponent(value);
      }
    }
    return re;
  };

  getUrlInfo = (): URLInfo => {
    const re = {
      href: window.location.href,
      hash: window.location.hash,
      pathname: window.location.pathname,
    };
    const pagename = this.getPathFromUrl(re as URLInfo);
    const routeSeed = this._getRouteSeed(this.getQueryFromUrl(re as URLInfo));
    const query = this.getQueryFromUrl(re as URLInfo) || {};
    return {
      ...re,
      ...{
        routeSeed: routeSeed,
        pagename,
        routeKey: `${pagename}_${routeSeed}`,
        query,
      },
    };
  };

  combinePathAndQuery = (path:string, query:JSONProperty):string => {
    let _path:string = path || '';
    if (_path.indexOf('#') === 0) {
      _path = _path.substring(1);
    }
    const queryStr = this.queryToString(query);
    let hash:string = `#${_path}`;
    if (queryStr.length > 0) {
      hash = `${hash}?${queryStr}`;
    }
    return hash;
  };

  queryToString = (query:JSONProperty):string => {
    const queryArr: string[] = [];
    const _query:JSONProperty = query || {};
    for (const key in _query) {
      const pVal = _query[key];
      if (!isNaN(pVal) || typeof (pVal) === 'string') {
        queryArr.push(`${key}=${encodeURIComponent(pVal)}`);
      } else {
        console.warn(`url 传参 ${key} 的值不是字符串类型或数字, queryToString 方法报错`);
      }
    }
    return queryArr.join('&');
  };
}

export default new RouteUtils();
