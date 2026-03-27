// 查询字典数据列表
export function listData(query) {
  return Promise.resolve({
    code: 200,
    rows: [],
    total: 0
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return Promise.resolve({
    code: 200,
    data: {}
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  if (dictType === 'sys_normal_disable') {
    return Promise.resolve({
      code: 200,
      data: [
        { dictValue: '0', dictLabel: '正常', dictType: 'sys_normal_disable' },
        { dictValue: '1', dictLabel: '停用', dictType: 'sys_normal_disable' }
      ]
    })
  } else if (dictType === 'sys_user_sex') {
    return Promise.resolve({
      code: 200,
      data: [
        { dictValue: '0', dictLabel: '男', dictType: 'sys_user_sex' },
        { dictValue: '1', dictLabel: '女', dictType: 'sys_user_sex' },
        { dictValue: '2', dictLabel: '未知', dictType: 'sys_user_sex' }
      ]
    })
  }
  return Promise.resolve({
    code: 200,
    data: []
  })
}

// 新增字典数据
export function addData(data) {
  return Promise.resolve({
    code: 200,
    msg: '新增成功'
  })
}

// 修改字典数据
export function updateData(data) {
  return Promise.resolve({
    code: 200,
    msg: '修改成功'
  })
}

// 删除字典数据
export function delData(dictCode) {
  return Promise.resolve({
    code: 200,
    msg: '删除成功'
  })
}
