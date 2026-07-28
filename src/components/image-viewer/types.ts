/*
 * @Author: czy0729
 * @Date: 2022-08-21 08:49:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:13:16
 */
/** 图片数据 */
export type ImageUrl = {
  /** 图片地址 */
  url: string

  /** 备用地址（用于菜单"浏览器打开"） */
  _url?: string

  /** 请求头（如 auth、Referer） */
  headers?: Record<string, string>
}

export type Props = {
  /** 初始显示第几张图 */
  index?: number

  /** 是否显示 */
  visible?: boolean

  /** 图片列表 */
  imageUrls?: ImageUrl[]

  /** 迷你模式（用于头像预览） */
  mini?: boolean

  /** 使用 RN 原生 Image 组件渲染（默认使用自定义 Image 组件） */
  useRN?: boolean

  /** 关闭回调 */
  onCancel?: () => void
}
