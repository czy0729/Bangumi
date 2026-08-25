/*
 * @Author: czy0729
 * @Date: 2026-08-25 19:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 19:45:12
 */
import { useEffect } from 'react'
import { _ } from '@stores'
import useOrientation from './useOrientation'

/** 获取水平状态并同步到主题仓库, 只有平板允许横屏, 手机锁竖屏 */
export default function useOrientationSync() {
  const orientation = useOrientation()

  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])
}
