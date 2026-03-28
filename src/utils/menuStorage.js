const MENU_STORAGE_KEY = 'ruoyi_menu_data'
const MENU_ID_KEY = 'ruoyi_menu_id_counter'

const defaultMenuData = [
  {
    menuId: 1,
    menuName: '系统管理',
    parentId: 0,
    orderNum: 1,
    path: 'system',
    component: 'Layout',
    menuType: 'M',
    visible: '0',
    status: '0',
    perms: '',
    icon: 'system',
    createBy: 'admin',
    createTime: '2026-03-28 10:00:00',
    updateBy: '',
    updateTime: '',
    remark: '系统管理目录',
    children: [
      {
        menuId: 100,
        menuName: '用户管理',
        parentId: 1,
        orderNum: 1,
        path: 'user',
        component: 'system/user/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'system:user:list',
        icon: 'user',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'User',
        isCache: '0',
        isFrame: '1'
      },
      {
        menuId: 101,
        menuName: '角色管理',
        parentId: 1,
        orderNum: 2,
        path: 'role',
        component: 'system/role/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'system:role:list',
        icon: 'peoples',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'Role',
        isCache: '0',
        isFrame: '1'
      },
      {
        menuId: 102,
        menuName: '菜单管理',
        parentId: 1,
        orderNum: 3,
        path: 'menu',
        component: 'system/menu/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'system:menu:list',
        icon: 'tree-table',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'Menu',
        isCache: '0',
        isFrame: '1'
      }
    ]
  },
  {
    menuId: 2,
    menuName: '系统监控',
    parentId: 0,
    orderNum: 2,
    path: 'monitor',
    component: 'Layout',
    menuType: 'M',
    visible: '0',
    status: '0',
    perms: '',
    icon: 'monitor',
    createBy: 'admin',
    createTime: '2026-03-28 10:00:00',
    remark: '系统监控目录',
    children: [
      {
        menuId: 200,
        menuName: '在线用户',
        parentId: 2,
        orderNum: 1,
        path: 'online',
        component: 'monitor/online/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'monitor:online:list',
        icon: 'online',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'Online',
        isCache: '0',
        isFrame: '1'
      },
      {
        menuId: 201,
        menuName: '定时任务',
        parentId: 2,
        orderNum: 2,
        path: 'job',
        component: 'monitor/job/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'monitor:job:list',
        icon: 'job',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'Job',
        isCache: '0',
        isFrame: '1'
      },
      {
        menuId: 202,
        menuName: '服务监控',
        parentId: 2,
        orderNum: 3,
        path: 'server',
        component: 'monitor/server/index',
        menuType: 'C',
        visible: '0',
        status: '0',
        perms: 'monitor:server:list',
        icon: 'server',
        createBy: 'admin',
        createTime: '2026-03-28 10:00:00',
        routeName: 'Server',
        isCache: '0',
        isFrame: '1'
      }
    ]
  }
]

export function getMenuData() {
  const data = localStorage.getItem(MENU_STORAGE_KEY)
  if (data) {
    return JSON.parse(data)
  }
  saveMenuData(defaultMenuData)
  return defaultMenuData
}

export function saveMenuData(data) {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data))
}

export function getNextMenuId() {
  let id = parseInt(localStorage.getItem(MENU_ID_KEY) || '1000')
  id++
  localStorage.setItem(MENU_ID_KEY, id.toString())
  return id
}

export function findMenuById(menus, menuId) {
  for (const menu of menus) {
    if (menu.menuId === menuId) {
      return menu
    }
    if (menu.children && menu.children.length > 0) {
      const found = findMenuById(menu.children, menuId)
      if (found) return found
    }
  }
  return null
}

export function findMenuParent(menus, menuId, parent = null) {
  for (const menu of menus) {
    if (menu.menuId === menuId) {
      return parent
    }
    if (menu.children && menu.children.length > 0) {
      const found = findMenuParent(menu.children, menuId, menu)
      if (found !== undefined) return found
    }
  }
  return undefined
}

export function addMenuToData(menu) {
  const menus = getMenuData()
  if (menu.parentId === 0) {
    menus.push(menu)
  } else {
    const parent = findMenuById(menus, menu.parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(menu)
    }
  }
  saveMenuData(menus)
  return true
}

export function updateMenuInData(menu) {
  const menus = getMenuData()
  const existingMenu = findMenuById(menus, menu.menuId)
  if (!existingMenu) {
    return false
  }

  if (existingMenu.parentId !== menu.parentId) {
    deleteMenuFromData(menu.menuId)
    addMenuToData(menu)
  } else {
    Object.assign(existingMenu, menu)
    saveMenuData(menus)
  }
  return true
}

export function deleteMenuFromData(menuId) {
  const menus = getMenuData()

  function removeFromArray(arr, id) {
    const index = arr.findIndex(m => m.menuId === id)
    if (index !== -1) {
      arr.splice(index, 1)
      return true
    }
    for (const menu of arr) {
      if (menu.children && menu.children.length > 0) {
        if (removeFromArray(menu.children, id)) {
          return true
        }
      }
    }
    return false
  }

  const result = removeFromArray(menus, menuId)
  if (result) {
    saveMenuData(menus)
  }
  return result
}

export function convertToRouterFormat(menus) {
  return menus.map(menu => {
    const router = {
      name: menu.routeName || menu.menuName,
      path: menu.parentId === 0 ? '/' + menu.path : menu.path,
      hidden: menu.visible === '1',
      component: menu.component,
      meta: {
        title: menu.menuName,
        icon: menu.icon,
        noCache: menu.isCache === '1',
        link: null
      }
    }

    if (menu.parentId === 0) {
      router.redirect = 'noRedirect'
      router.alwaysShow = true
    }

    if (menu.children && menu.children.length > 0) {
      router.children = convertToRouterFormat(menu.children)
    }

    return router
  })
}

export function getFlatMenuList(menus) {
  const result = []
  function flatten(list) {
    list.forEach(menu => {
      const menuCopy = { ...menu }
      delete menuCopy.children
      result.push(menuCopy)
      if (menu.children && menu.children.length > 0) {
        flatten(menu.children)
      }
    })
  }
  flatten(menus)
  return result
}
