/*
 * @Date: 2026-11-01
 *
 * Passkey 说明入口与预留图片配置
 */
export type Props = {
  /** 认证进行中不叠加说明弹窗 */
  disabled: boolean
}

export type GuideImageSlot = {
  /** 图片位置, 保持三张说明图的顺序 */
  id: 1 | 2 | 3

  /** 打包在应用内的 require 图片资源, 优先于远程地址 */
  source?: number

  /** 可选远程图片地址; 不向图集传空地址 */
  url?: string
}

export type GuideThumb = {
  /** 图集索引与兼容信息使用的图片 URI */
  url: string

  /** 本地资源的原始宽度, 避免额外尺寸请求 */
  width?: number

  /** 本地资源的原始高度 */
  height?: number

  /** 保留原始打包资源, 兼容 release 的 drawable */
  props?: {
    /** RN Image 可直接使用的资源编号 */
    source: number
  }
}
