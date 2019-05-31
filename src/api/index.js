import fetch from './fetch'
// 登录（测试）
export function login() {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      username:"cqkd88@gmail.com",
      password: "12345678",
      device_type: 'pc',
      client_terminal_type: 'web',
      type: 'account'
    }
  })
}
// 本地上传测试
export function test() {
  return fetch({
    url: '/upload',
    method: 'get'
  })
}
// 上传文件：第一步：申请上传地址
export function uploadFirst(params) {
  return fetch({
    url: '/file/0',
    method: 'get',
    params: params
  })
}