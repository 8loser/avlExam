/**
 * 封裝axios API呼叫
 * 參考資料
 * https://juejin.im/post/5b55c118f265da0f6f1aa354
 */
import axios from "axios";
import Qs from "qs";

axios.defaults.timeout = 5000;

/**
 * API路徑
 */
axios.defaults.baseURL = process.env.VUE_APP_API_BASEURL;

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = Qs.stringify(config.data); //https://www.jianshu.com/p/b22d03dfe006
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response狀態處理
axios.interceptors.response.use(
  (response) => {
    if (response.data.result == "failed") {
      return Promise.reject(response.data.message);
    }
    return response;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          return Promise.reject(" 錯誤請求");
        case 401:
          return Promise.reject(" 未授權，請重新登入");
        case 403:
          return Promise.reject(" 拒絕訪問");
        case 404:
          return Promise.reject(" 請求錯誤，未找到該資源");
        case 405:
          return Promise.reject(" 請求方法未允許");
        case 408:
          return Promise.reject(" 請求超時");
        case 500:
          return Promise.reject(" 服務端錯誤");
        case 501:
          return Promise.reject(" 網路未實現");
        case 502:
          return Promise.reject(" 網路錯誤");
        case 503:
          return Promise.reject(" 服務不可用");
        case 504:
          return Promise.reject(" 網路超時");
        case 505:
          return Promise.reject(" HTTP不支援該請求");
        default:
          return Promise.reject(err.response);
      }
    } else {
      return Promise.reject("API 無回應");
    }
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * API接口
 */

// 呼叫發送Email
export const MailSev = {
  post: function(paramObj) {
    return post("Mail", paramObj);
  },
};

// 將封裝的方法打包起來
// export const UserServer = {
//   fetch: function(paramObj) {
//     return fetch("api/users", paramObj);
//   },
//   post: function(paramObj) {
//     return post("api/users", paramObj);
//   },
//   put: function(paramObj) {
//     return put("api/users", paramObj);
//   },
//   delete: function(paramObj) {
//     return remove("api/users", paramObj);
//   }
// };
// 使用方法
// import { UserServer } from "../../providers/http-server-user";
// UserServer.fetch(filters).then(
//   (response) => (this.users = response)
// );

export default axios;
