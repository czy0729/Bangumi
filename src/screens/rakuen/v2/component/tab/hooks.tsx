/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 */
import { useMemo } from 'react'
import { TABS } from '../../ds'
import List from '../list'

import type { ReactNode } from 'react'

/**
 * 按需创建 renderScene，避免模块加载时创建所有 tab 的渲染函数
 */
export function useRenderScene() {
  return useMemo(() => {
    const scenes: Record<string, () => ReactNode> = {}

    TABS.forEach((tab, index) => {
      scenes[tab.key] = () => <List index={index} />
    })

    return (props: { route: { key: string } }) => {
      const scene = scenes[props.route.key]
      return scene ? scene() : null
    }
  }, [])
}
