/*
 * @Author: czy0729
 * @Date: 2024-11-14 06:16:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 05:22:30
 */
import { createContext, useContext } from 'react'
import { r } from '@utils/dev'
import { urlStringify } from '@utils/utils'
import Stores from './global'

import type { NavigationProps } from '@types'
import type { Context, StoreContextValue } from './types'

/** 初始化页面的状态机 */
export function useInitStore<T>(props: NavigationProps, Store: new () => T) {
  const { navigation, route } = props
  const id = getScreenKey(props.route)

  let context: Context<T> = Stores.get(id)
  if (!context) {
    context = {
      id,
      $: new Store(),
      navigation
    }

    context.$.params = route.params || {}
    Stores.add(id, context)
  } else {
    context.$.params = route.params || {}
  }

  return context
}

/** 存放唯一状态机标识, 以便向上获取属于该页面的状态机上下文 */
export const StoreContext = createContext('')

/** 获取页面的状态机 */
export function useStore<T>(componentUniqueKey?: string): StoreContextValue<T> {
  if (componentUniqueKey) r(componentUniqueKey)

  const id = useContext(StoreContext)

  return (
    Stores.get<StoreContextValue<T>>(id) ||
    ({
      id: '',
      $: {},
      navigation: {}
    } as unknown as StoreContextValue<T>)
  )
}

/** 根据路由参数构造唯一状态机标识 */
function getScreenKey(route: NavigationProps['route']) {
  const params = Object.entries(route?.params || {})
    // 后期对页面跳转传递数据进行了优化, 排除 params 里面 _ 开头的 key, 如 _name, _image
    .filter(([key]) => !key.startsWith('_'))
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})

  return `${route.name || ''}?${urlStringify(params, false)}`
}
