/*
 * @Author: czy0729
 * @Date: 2026-09-25 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-25 20:30:00
 */
export type Props = {
  /** 是否已登录 */
  isLogin: boolean

  /** 是否显示所有项 */
  active: boolean

  /** 切换显示所有项 */
  onToggle: () => void

  /** 云端下载成功后回调, 重新初始化页面数据 */
  onDownloaded: () => void
}
