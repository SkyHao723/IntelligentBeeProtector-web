// 查询用户列表
export function listUser(query) {
  return Promise.resolve({
    code: 200,
    rows: [
      {
        userId: 1,
        userName: 'admin',
        nickName: '超级管理员',
        email: 'admin@ruoyi.com',
        phonenumber: '15888888888',
        sex: '0',
        status: '0',
        createTime: '2023-01-01 00:00:00'
      },
      {
        userId: 2,
        userName: 'ry',
        nickName: '若依',
        email: 'ry@ruoyi.com',
        phonenumber: '15666666666',
        sex: '1',
        status: '0',
        createTime: '2023-01-02 00:00:00'
      }
    ],
    total: 2
  })
}

// 查询用户详细
export function getUser(userId) {
  return Promise.resolve({
    code: 200,
    data: {
      userId: userId,
      userName: 'admin',
      nickName: '超级管理员',
      email: 'admin@ruoyi.com',
      phonenumber: '15888888888',
      sex: '0',
      status: '0',
      createTime: '2023-01-01 00:00:00'
    }
  })
}

// 新增用户
export function addUser(data) {
  return Promise.resolve({
    code: 200,
    msg: '新增成功'
  })
}

// 修改用户
export function updateUser(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 删除用户
export function delUser(userId) {
  return Promise.resolve({
    code: 200,
    msg: '删除成功'
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  return Promise.resolve({
    code: 200,
    msg: '重置成功'
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return Promise.resolve({
    code: 200,
    data: {
      user: {
        userId: 1,
        userName: 'admin',
        nickName: '超级管理员',
        email: 'admin@ruoyi.com',
        phonenumber: '15888888888',
        sex: '0'
      },
      roleGroup: '超级管理员',
      postGroup: '董事长'
    }
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return Promise.resolve({
    code: 200,
    msg: '上传成功'
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return Promise.resolve({
    code: 200,
    data: {
      roles: [
        { roleId: 1, roleName: '超级管理员', roleKey: 'admin', roleSort: 1, status: '0', flag: true }
      ],
      user: {
        userId: userId,
        userName: 'admin'
      }
    }
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return Promise.resolve({
    code: 200,
    msg: '保存成功'
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return Promise.resolve({
    code: 200,
    data: [
      {
        id: 100,
        label: '若依科技',
        children: [
          { id: 101, label: '深圳总公司' },
          { id: 102, label: '长沙分公司' }
        ]
      }
    ]
  })
}
