/*
 * @Author: czy0729
 * @Date: 2024-02-13 16:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:26
 */
import { useEffect, useRef } from 'react'
import { IOS } from '@constants/constants'
import { DEV } from '@src/config'

import type { Navigation } from '@types'

/** 是否开启 enableScreens */
export const enabled = IOS

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

  return navigationRef
}

function convertToPath(path: string): string {
  if (path === 'HomeTab') return 'home/v2'
  if (path === 'Subject') return 'home/subject'

  const convertedStr = path.replace(/([A-Z])/g, '/$1').toLowerCase()
  return convertedStr.startsWith('/') ? convertedStr.slice(1) : convertedStr
}
