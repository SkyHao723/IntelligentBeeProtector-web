import { getMenuData, convertToRouterFormat } from '@/utils/menuStorage'

export const getRouters = () => {
  const menuData = getMenuData()
  const routers = convertToRouterFormat(menuData)
  return Promise.resolve({
    code: 200,
    data: routers
  })
}
