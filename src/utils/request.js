import axios from 'axios'
// import { getContextPath } from 'utils'

// 创建实例
const service = axios.create({
  baseURL: '../../static', //getContextPath(),
  timeout: 1000 * 60,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/x-www-form-urlencoded"
  },
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest: [function (data) {
    if (!data) return '';
    let pairs = [], value;
    for (let name in data) {
      if (!Object.prototype.hasOwnProperty.call(data, name)) continue;
      if (typeof data[name] === 'function') continue;
      value = String(data[name]);
      name = encodeURIComponent(name);
      value = encodeURIComponent(value);
      pairs.push(name + '=' + value);
    }
    if (pairs.length) {
      return pairs.join('&');
    } else {
      return ''
    }
  }],
  transformResponse: [ data => {
    return data;
  }],
  responseType: 'json'
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 成功的拦截
    return response.data
  },
  error => {
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service