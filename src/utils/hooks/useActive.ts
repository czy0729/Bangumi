/*
 * @Author: czy0729
 * @Date: 2026-09-22 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 */
import { useContext } from 'react'
import { SceneActiveContext } from '../context'
import useAppState from './useAppState'
import useIsFocusedApp from './useIsFocusedApp'

/**
 * 页面聚焦且应用在前台且所在 Pager 场景聚焦
 *
 * blur 时同步置为 false (不同于 useIsFocused 的下一帧延迟), 让失焦页面在冻结前完成最后一次渲染
 */
export default function useActive(): boolean {
  const isFocused = useIsFocusedApp()
  const appState = useAppState()
  const sceneActive = useContext(SceneActiveContext)
  return isFocused && appState && sceneActive
}
