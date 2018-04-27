import axios from 'axios';

//拦截请求
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，如：设置请求头
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 根据返回的errno值来做不同的处理，需要和后端统一定义
    if(response.status == 200 && response.data.errno){
      switch(response.data.errno){
        case 1999: 
          break;
        // 正常时返回10000
        case 10000: 
          console.log("正常时返回10000");
          break;
        // 登陆超时处理逻辑
        case 20001: 
          console.log("登陆超时处理逻辑");
          break;
        // 其他服务端错误处理逻辑
        default:
          console.log("其他服务端错误处理逻辑");
          break;
      }
    }
    return response;
  }, function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求地址语法错误，请重试！'
          break

        case 401:
          error.message = '未授权，请登录！'
          break

        case 403:
          error.message = '服务器拒绝请求，请重试！'
          break

        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break

        case 408:
          error.message = '请求超时！'
          break

        case 500:
          error.message = '服务器内部错误，请刷新页面或重试操作！'
          break

        case 501:
          error.message = '服务未实现！'
          break

        case 502:
          error.message = '服务器网关错误，请刷新页面或重试操作！'
          break

        case 503:
          error.message = '服务暂时不可用，请稍后重试！'
          break

        case 504:
          error.message = '服务器网关超时，请刷新页面或重试操作！'
          break

        case 505:
          error.message = 'HTTP版本不受支持！'
          break
        default:
      }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default {
	axios : axios
}