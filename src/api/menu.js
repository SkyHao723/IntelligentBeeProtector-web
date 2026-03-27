// 获取路由
export const getRouters = () => {
  return Promise.resolve({
    code: 200,
    data: [
      {
        name: 'System',
        path: '/system',
        hidden: false,
        redirect: 'noRedirect',
        component: 'Layout',
        alwaysShow: true,
        meta: {
          title: '系统管理',
          icon: 'system',
          noCache: false,
          link: null
        },
        children: [
          {
            name: 'User',
            path: 'user',
            hidden: false,
            component: 'system/user/index',
            meta: {
              title: '用户管理',
              icon: 'user',
              noCache: false,
              link: null
            }
          },
          {
            name: 'Role',
            path: 'role',
            hidden: false,
            component: 'system/role/index',
            meta: {
              title: '角色管理',
              icon: 'peoples',
              noCache: false,
              link: null
            }
          },
          {
            name: 'Menu',
            path: 'menu',
            hidden: false,
            component: 'system/menu/index',
            meta: {
              title: '菜单管理',
              icon: 'tree-table',
              noCache: false,
              link: null
            }
          }
        ]
      },
      {
        name: 'Monitor',
        path: '/monitor',
        hidden: false,
        redirect: 'noRedirect',
        component: 'Layout',
        alwaysShow: true,
        meta: {
          title: '系统监控',
          icon: 'monitor',
          noCache: false,
          link: null
        },
        children: [
          {
            name: 'Online',
            path: 'online',
            hidden: false,
            component: 'monitor/online/index',
            meta: {
              title: '在线用户',
              icon: 'online',
              noCache: false,
              link: null
            }
          },
          {
            name: 'Job',
            path: 'job',
            hidden: false,
            component: 'monitor/job/index',
            meta: {
              title: '定时任务',
              icon: 'job',
              noCache: false,
              link: null
            }
          },
          {
            name: 'Server',
            path: 'server',
            hidden: false,
            component: 'monitor/server/index',
            meta: {
              title: '服务监控',
              icon: 'server',
              noCache: false,
              link: null
            }
          }
        ]
      }
    ]
  })
}
