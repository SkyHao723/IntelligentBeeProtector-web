// 查询角色列表
export function listRole(query) {
  return Promise.resolve({
    code: 200,
    rows: [
      {
        roleId: 1,
        roleName: '超级管理员',
        roleKey: 'admin',
        roleSort: 1,
        dataScope: '1',
        status: '0',
        createTime: '2023-01-01 00:00:00'
      },
      {
        roleId: 2,
        roleName: '普通角色',
        roleKey: 'common',
        roleSort: 2,
        dataScope: '2',
        status: '0',
        createTime: '2023-01-02 00:00:00'
      }
    ],
    total: 2
  })
}

// 查询角色详细
export function getRole(roleId) {
  return Promise.resolve({
    code: 200,
    data: {
      roleId: roleId,
      roleName: '超级管理员',
      roleKey: 'admin',
      roleSort: 1,
      dataScope: '1',
      status: '0',
      createTime: '2023-01-01 00:00:00'
    }
  })
}

// 新增角色
export function addRole(data) {
  return Promise.resolve({
    code: 200,
    msg: '新增成功'
  })
}

// 修改角色
export function updateRole(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 角色数据权限
export function dataScope(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 删除角色
export function delRole(roleId) {
  return Promise.resolve({
    code: 200,
    msg: '删除成功'
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return Promise.resolve({
    code: 200,
    rows: [
      {
        userId: 1,
        userName: 'admin',
        nickName: '超级管理员'
      }
    ],
    total: 1
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return Promise.resolve({
    code: 200,
    rows: [],
    total: 0
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return Promise.resolve({
    code: 200,
    msg: '取消成功'
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return Promise.resolve({
    code: 200,
    msg: '取消成功'
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return Promise.resolve({
    code: 200,
    msg: '授权成功'
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
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
