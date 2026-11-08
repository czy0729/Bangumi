/*
 * @Author: czy0729
 * @Date: 2026-11-09 18:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 头部参数
 */
export type Props = {
  /** 页面标题 */
  title?: string

  /** 页面地址 */
  url: string

  /** 刷新 */
  onRefresh: () => void
}
