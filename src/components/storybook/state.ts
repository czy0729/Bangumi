/*
 * @Author: czy0729
 * @Date: 2023-04-13 18:28:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 19:50:19
 */
export const StorybookState = {
  /** 当前的路由动作 */
  navigateAction: '' as 'PUSH' | 'REPLACE' | 'POP',

  /** 缓存每个页面的滚动高度 */
  scrollTopMap: new Map<string, number>()
}
