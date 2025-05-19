/*
 * @Author: czy0729
 * @Date: 2024-02-13 16:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-19 23:40:31
 */
import { useEffect, useRef } from 'react'
import { enableScreens } from 'react-native-screens'
import { devLog } from '@components'
import { IOS } from '@constants/constants'
import { DEV, IOS_IPA } from '@src/config'
import { Navigation } from '@types'

/** 路由路径达到长度后开启 enableScreens */
const enabledLimit = 5

/** 是否开启 enableScreens */
export let enabled = false

/** 上一个页面路径 */
let lastPath = ''

export function useEnableScreens() {
  const navigationRef = useRef<Navigation>(null)

  // 开发打印辅助数据
  useEffect(() => {
    if (!DEV || !navigationRef.current) return

    const unsubscribe = navigationRef.current.addListener('state', () => {
      const currentPath = convertToPath(navigationRef.current.getCurrentRoute().name)
      if (lastPath && lastPath === currentPath) return

      // console.info(TEXT_BADGES.primary, `./src/screens/${currentPath}/index.tsx`)
      lastPath = currentPath
    })
    return unsubscribe
  }, [])

  // 当页码少于 enabledLimit 页时, 不启用 react-native-screens, 这样切页动画会流畅非常多
  // 当大于 enabledLimit 页时, 为了节省重叠页面的内存占用, 重新启动
  useEffect(() => {
    if (!IOS || IOS_IPA) return

    const unsubscribe = navigationRef.current?.addListener('state', e => {
      const { index } = e.data.state
      if (!enabled && index > enabledLimit) {
        enabled = true
        enableScreens(enabled)
        devLog('enableScreens', enabled)
      } else if (enabled && index <= enabledLimit) {
        enabled = false
        enableScreens(enabled)
        devLog('enableScreens', enabled)
      }
    })

    return unsubscribe
  }, [])

  return navigationRef
}

function convertToPath(path: string): string {
  if (path === 'HomeTab') return 'home/v2'
  if (path === 'Subject') return 'home/subject'

  const convertedStr = path.replace(/([A-Z])/g, '/$1').toLowerCase()
  return convertedStr.startsWith('/') ? convertedStr.slice(1) : convertedStr
}
