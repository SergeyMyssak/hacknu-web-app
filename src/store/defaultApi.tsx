/* TODO: stdApiGET was modified, options are no longer included */

export const STD_HEADERS = {
  Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  'Content-Type': 'application/json',
  Authorization: '',
  'Accept-Language': '',
};

const modifyHeader = (options: any) => {
  const headers = STD_HEADERS;

  if (options.formData) {
    headers['Content-Type'] =
      'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';
  }

  if (!!options.token) {
    const str = options.token.replace(/"/g, '');
    headers['Authorization'] = `Bearer ${str}`;
  }

  if (!!options.lang) {
    headers['Accept-Language'] = options.lang;
  }

  return headers;
};

export const stdApiPOST = (options: any) => {
  const formData = new FormData();
  formData.append(options.rawHeader, options.raw);

  return fetch(options.url, {
    method: 'POST',
    headers: modifyHeader(options),
    // body: options.data,
    body: options.raw ? formData : JSON.stringify(options.data || {}),
    // body: qs.stringify(options.data || {}),
  });
};

export const stdApiDELETE = (options: any) =>
  fetch(options.url, {
    method: 'DELETE',
    headers: modifyHeader(options),
    body: JSON.stringify(options.data || {}),
    // body: qs.stringify(options.data || {}),
  });

export const stdApiPUT = (options: any) =>
  fetch(options.url, {
    method: 'PUT',
    headers: modifyHeader(options),
    body: JSON.stringify(options.data || {}),
    // body: qs.stringify(options.data || {}),
  });

export const stdApiGET = (options: any) =>
  fetch(`${options.url}`, {
    method: 'GET',
    headers: modifyHeader(options),
  });

export const apiFormData = (options: any) =>
  fetch(options.url, {
    method: 'POST',
    headers: modifyHeader({ ...options, formData: true }),
    body: options.data,
  });
