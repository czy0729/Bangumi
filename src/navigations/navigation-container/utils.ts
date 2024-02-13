/*
 * @Author: czy0729
 * @Date: 2024-02-13 16:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-13 17:13:06
 */
import { useEffect } from 'react'
import { DEV } from '@/config'
import { Navigation } from '@types'

let lastPath = ''

/** 开发打印辅助数据 */
export function useDevInfo(navigation: Navigation) {
  useEffect(() => {
    if (!DEV || !navigation) return

    const unsubscribe = navigation.addListener('state', () => {
      const currentPath = convertToPath(navigation.getCurrentRoute().name)
      if (lastPath && lastPath === currentPath) return

      console.info('\x1b[42m%s\x1b[0m', `./src/screens/${currentPath}/index.tsx`)
      lastPath = currentPath
    })
    return unsubscribe
  }, [navigation])
}

function convertToPath(path: string): string {
  if (path === 'HomeTab') return 'home/v2'
  if (path === 'Subject') return 'home/subject'

  const convertedStr = path.replace(/([A-Z])/g, '/$1').toLowerCase()
  return convertedStr.startsWith('/') ? convertedStr.slice(1) : convertedStr
}
