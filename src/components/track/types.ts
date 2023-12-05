/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:15:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 03:18:05
 */
export type Props = {
  /** 页面标题 */
  title: string

  /** [WEB] 若有此值, 页面标题以此优先 */
  domTitle?: string

  /** 统计参数: [url地址, 对应页面key] */
  hm?: [string] | [string, string]

  /** 统计别名 */
  alias?: string
}

export type UMProps = {
  /** 页面的名称 (中文) */
  title: string
}
