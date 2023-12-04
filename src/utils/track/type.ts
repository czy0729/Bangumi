/*
 * @Author: czy0729
 * @Date: 2023-12-01 20:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-02 20:24:15
 */
export type HMQuery = {
  /** 版本号 */
  v: string

  /** 是否来自侧载 */
  ipa?: 1

  /** 是否启用黑暗模式 */
  dark?: 1

  /** 是否关闭了默认字体 */
  font?: 1

  /** 路由 */
  s?: string
}

export type EventData = {
  [key: string]: string | number | boolean
}
