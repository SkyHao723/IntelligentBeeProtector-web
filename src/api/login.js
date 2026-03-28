// 登录方法
export function login(username, password, code, uuid) {
  return Promise.resolve({
    code: 200,
    token: 'fake-token'
  })
}

// 注册方法
export function register(data) {
  return Promise.resolve({
    code: 200,
    msg: '注册成功'
  })
}

// 获取用户详细信息
export function getInfo() {
  return Promise.resolve({
    code: 200,
    user: {
      userId: 1,
      userName: 'admin',
      nickName: '超级养蜂人',
      avatar: '',
      email: 'admin@ruoyi.com',
      phonenumber: '15888888888',
      sex: '0',
      createTime: '2023-01-01 00:00:00'
    },
    roles: ['admin'],
    permissions: ['*:*:*'],
    isDefaultModifyPwd: false,
    isPasswordExpired: false
  })
}

// 解锁屏幕
export function unlockScreen(password) {
  return Promise.resolve({
    code: 200,
    msg: '解锁成功'
  })
}

// 退出方法
export function logout() {
  return Promise.resolve({
    code: 200,
    msg: '退出成功'
  })
}

// 获取验证码
export function getCodeImg() {
  return Promise.resolve({
    captchaEnabled: false
  })
}
