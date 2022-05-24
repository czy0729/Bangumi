/*
 * @Author: czy0729
 * @Date: 2022-03-10 02:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 04:13:11
 */
type RoutesConfig = {
  [key: string]: {
    icon: string
    size?: number
    label: string
  }
}

export const routesConfig: RoutesConfig = {
  Discovery: {
    icon: 'home',
    size: 19,
    label: '发现'
  },
  Timeline: {
    icon: 'md-access-time',
    size: 21,
    label: '时间胶囊'
  },
  Home: {
    icon: 'md-star-outline',
    label: '收藏'
  },
  Rakuen: {
    icon: 'md-chat-bubble-outline',
    size: 19,
    label: '超展开'
  },
  User: {
    icon: 'md-person-outline',
    label: '时光机'
  }
}
