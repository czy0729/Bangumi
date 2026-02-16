/*
 * @Author: czy0729
 * @Date: 2023-04-13 18:28:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:52:01
 */
import { WEB } from '@constants'

type NavigateAction = 'PUSH' | 'REPLACE' | 'POP'

/** [WEB] 单页面内部私有状态 */
export const StorybookState = {
  /** 是否跳转过程中 */
  navigating: false,

  /** 当前的路由动作 */
  navigateAction: '' as NavigateAction,

  /** 缓存每个页面的滚动高度 */
  scrollTopMap: new Map<string, number>()
}

/** 更新跳转状态 */
export function setNavigating(navigateAction: NavigateAction) {
  StorybookState.navigating = true
  StorybookState.navigateAction = navigateAction
  setTimeout(() => {
    StorybookState.navigating = false
  }, 800)
}

/** @hack 因不符合流程规范, 请勿随意使用 */
export function __FORCE_SET_NAVIGATING__() {
  StorybookState.navigating = true
}

if (WEB) {
  // @ts-expect-error
  if (!window.bgm) window.bgm = {}
  // @ts-expect-error
  window.bgm.StorybookState = StorybookState
}
