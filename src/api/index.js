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

export function test() {
  return fetch({
    url: '/upload',
    method: 'get'
  })
}