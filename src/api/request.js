import axios from "axios";
//列表请求
export function list_get(parameter){
  console.log(parameter,'111')
    return axios.get('/apis/data/list',{ params : parameter })
}
export function check_get(parameter){
  console.log(parameter,'asd')
    return axios.get('/apis/data/check',{ params : parameter })
}
export function details_get(parameter){
    return axios.get('/apis/detail/details',{ params : parameter })
}
export function comment_get(parameter){
    return axios.get('/apis/detail/comment',{ params : parameter })
}
export function like_post(parameter){
  return axios.post('/apis/detail/like',parameter)
}
export function notlike_post(parameter){
  return axios.post('/apis/detail/notlike',parameter)
}
export function content_post(parameter){
  return axios.post('/apis/detail/content',parameter)
}
export function Replycontent_post(parameter){
  return axios.post('/apis/detail/replycontent',parameter)
}
export function screen_get(parameter){
  return axios.get('/apis/screen',{ params : parameter })
}


axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if(token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject();
    }
  );

//设置响应拦截器
axios.interceptors.response.use(res => {
    //判断 success的结果是 false 或 true
    if(res.data.code === 200){
      //结果为true 那么返回去掉外层data之后的数据
      const data = res.data.data;
      if(data && data.token) localStorage.setItem("access_token", data.token);
      return res.data
    } else {
      //结果为false 返回message中的错误信息
      return Promise.reject(new Error(res.data.msg))
    }
  }), error => {
    return Promise.reject(error)
  }