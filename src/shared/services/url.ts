import transform from 'lodash/transform';

export class Url {
  private url;
  private params: any;

  constructor(url: any = '', params: any = '') {
    this.url = url;
    this.params = params;
  }

  addParams(params: any) {
    Object.assign(this.params, params);
  }

  toString() {
    let paramsStr = this.params ? '?' : '';

    paramsStr += transform(
      this.params,
      (result: string[], value: string, key: string) => {
        result.push(`${key}=${value}`);
      },
      []
    ).join('&');

    return this.url + paramsStr;
  }
}
