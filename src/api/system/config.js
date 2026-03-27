// 查询参数列表
export function listConfig(query) {
  return Promise.resolve({
    code: 200,
    rows: [],
    total: 0
  })
}

// 查询参数详细
export function getConfig(configId) {
  return Promise.resolve({
    code: 200,
    data: {}
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  if (configKey === 'sys.user.initPassword') {
    return Promise.resolve({
      code: 200,
      msg: '操作成功',
      configValue: '123456'
    })
  }
  return Promise.resolve({
    code: 200,
    msg: '操作成功',
    configValue: ''
  })
}

// 新增参数配置
export function addConfig(data) {
  return Promise.resolve({
    code: 200,
    msg: '新增成功'
  })
}

// 修改参数配置
export function updateConfig(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 删除参数配置
export function delConfig(configId) {
  return Promise.resolve({
    code: 200,
    msg: '删除成功'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return Promise.resolve({
    code: 200,
    msg: '刷新成功'
  })
}
