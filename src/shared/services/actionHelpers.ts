export class AsyncAction {
  public REQUEST;
  public SUCCESS;
  public FAILURE;

  constructor(type: string) {
    if (!type) {
      throw new Error('Type parameter is mandatory');
    }

    this.REQUEST = `${type}_REQUEST`;
    this.SUCCESS = `${type}_SUCCESS`;
    this.FAILURE = `${type}_FAILURE`;
  }

  request(payload?: any) {
    return { type: this.REQUEST, payload };
  }

  success(payload?: any) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload?: any) {
    return { type: this.FAILURE, payload };
  }
}

export class Action {
  public ACTION;

  constructor(type: string) {
    if (!type) {
      throw new Error('Type parameter is mandatory');
    }

    this.ACTION = type;
  }

  action(payload?: any) {
    return { type: this.ACTION, payload };
  }
}
