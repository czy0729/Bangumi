/*
 * @Author: czy0729
 * @Date: 2026-09-01 03:52:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:57:30
 *
 * storybook 仿 react-navigation 的路由对象类型
 */

/** [WEB] 仿 react-navigation 的路由对象类型 */
export type StorybookNavigationType = {
  /** 页面历史 (用于模拟 goBack / popToTop) */
  _history: {
    length: number

    /** 底部标签当前指向的路由 */
    lastBottomTab: string
  }

  /** 更新页面历史长度 */
  _updateHistory: (value: 1 | -1) => void

  /** 更新底部标签当前路由 */
  _updateBottomTabCurrent: (routeName: string) => void

  /** 获取路由状态 */
  getState: () => { index: number }

  /** 跳转页面 */
  navigate: (routeName?: string, params?: Record<string, unknown>) => void

  /** 压栈跳转页面 */
  push: (routeName: string, params?: Record<string, unknown>) => void

  /** 替换当前页面 */
  replace: (routeName: string, params?: Record<string, unknown>) => void

  /** 出栈到顶部 */
  popToTop: () => void

  /** 后退 */
  goBack: () => void

  /** 订阅事件, 返回取消订阅函数 */
  addListener: (key: string, callback: () => void) => () => void

  /** 触发订阅事件 */
  emit: (args: { type?: string }) => void

  /** 动态设置路由参数 (空实现, 与 react-navigation 对齐) */
  setOptions: () => void

  /** 获取根部路由状态 */
  getRootState: () => { index: number } | undefined
}
