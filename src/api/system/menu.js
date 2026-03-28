import {
  getMenuData,
  saveMenuData,
  getNextMenuId,
  findMenuById,
  addMenuToData,
  updateMenuInData,
  deleteMenuFromData,
  getFlatMenuList
} from '@/utils/menuStorage'

export function listMenu(query) {
  return new Promise(resolve => {
    let menuData = getMenuData()
    if (query && query.menuName) {
      const flatList = getFlatMenuList(menuData)
      const filtered = flatList.filter(item =>
        item.menuName && item.menuName.includes(query.menuName)
      )
      resolve({ data: filtered })
    } else if (query && query.status) {
      const flatList = getFlatMenuList(menuData)
      const filtered = flatList.filter(item => item.status === query.status)
      resolve({ data: filtered })
    } else {
      resolve({ data: menuData })
    }
  })
}

export function getMenu(menuId) {
  return new Promise((resolve, reject) => {
    const menuData = getMenuData()
    const menu = findMenuById(menuData, menuId)
    if (menu) {
      resolve({ data: menu })
    } else {
      reject({ msg: '菜单不存在' })
    }
  })
}

export function treeselect() {
  return new Promise(resolve => {
    const menuData = getMenuData()
    resolve({ data: menuData })
  })
}

export function roleMenuTreeselect(roleId) {
  return new Promise(resolve => {
    const menuData = getMenuData()
    resolve({
      data: menuData,
      checkedKeys: menuData.map(m => m.menuId)
    })
  })
}

export function addMenu(data) {
  return new Promise(resolve => {
    const menu = {
      ...data,
      menuId: getNextMenuId(),
      createTime: new Date().toLocaleString().replace(/\//g, '-'),
      createBy: 'admin'
    }
    addMenuToData(menu)
    resolve({ code: 200, msg: '新增成功' })
  })
}

export function updateMenu(data) {
  return new Promise((resolve, reject) => {
    const result = updateMenuInData(data)
    if (result) {
      resolve({ code: 200, msg: '修改成功' })
    } else {
      reject({ msg: '菜单不存在' })
    }
  })
}

export function updateMenuSort(data) {
  return new Promise(resolve => {
    if (data.menuIds && data.orderNums) {
      const menuIds = data.menuIds.split(',')
      const orderNums = data.orderNums.split(',')
      const menuData = getMenuData()

      menuIds.forEach((id, index) => {
        const menu = findMenuById(menuData, parseInt(id))
        if (menu) {
          menu.orderNum = parseInt(orderNums[index])
        }
      })

      saveMenuData(menuData)
    }
    resolve({ code: 200, msg: '排序保存成功' })
  })
}

export function delMenu(menuId) {
  return new Promise((resolve, reject) => {
    const result = deleteMenuFromData(menuId)
    if (result) {
      resolve({ code: 200, msg: '删除成功' })
    } else {
      reject({ msg: '菜单不存在' })
    }
  })
}
