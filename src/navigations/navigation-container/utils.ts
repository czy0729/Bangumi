/*
 * @Author: czy0729
 * @Date: 2024-02-13 16:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 15:58:33
 */
import { useEffect, useRef } from 'react'
import { DEV } from '@src/config'

import type { Navigation } from '@types'

/** 上一个页面路径 */
let lastPath = ''

export function useNavigationRef() {
  const navigationRef = useRef<Navigation>(null)

  // 开发打印辅助数据
  useEffect(() => {
    if (!DEV || !navigationRef.current) return

    const subscription = navigationRef.current.addListener('state', () => {
      const currentPath = convertToPath(navigationRef.current.getCurrentRoute().name)
      if (lastPath && lastPath === currentPath) return

      // console.info(TEXT_BADGES.primary, `./src/screens/${currentPath}/index.tsx`)
      lastPath = currentPath
    })

    return () => subscription.remove()
  }, [])

  /**
   * 这里不再动态切换 enableScreens
   * 运行中反复 enableScreens(true / false) 会让已挂载的 Screen 在原生容器与普通 View 之间来回切换,
   * 既无法释放已 push 页面的内存, 又容易导致视图状态与 JSI 不一致; screens 4.x 默认启用即可
   */
  return navigationRef
}

function convertToPath(path: string): string {
  if (path === 'HomeTab') return 'home/v2'
  if (path === 'Subject') return 'home/subject'

  const convertedStr = path.replace(/([A-Z])/g, '/$1').toLowerCase()
  return convertedStr.startsWith('/') ? convertedStr.slice(1) : convertedStr
}
