/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:14:55
 *
 * Passkey 登录入口与说明图的类型
 */
import type { PasskeyLoginView } from '../../passkey/types'

/** 登录入口 Props */
export type Props = {
  /** 同一控制器用于预览页和密码表单 */
  passkey: PasskeyLoginView

  /** 密码认证期间禁止开始另一条认证链路 */
  blocked: boolean
}

/** 说明入口 Props */
export type GuideProps = {
  /** 认证进行中不响应点击 */
  disabled: boolean
}

/** 说明图配置 */
export type GuideImageSlot = {
  /** 图片顺序，保持三张说明图的展示次序 */
  id: 1 | 2 | 3

  /** 打包在应用内的 require 图片资源 */
  source: number
}

/** 图集条目 */
export type GuideThumb = {
  /** 图集索引使用的图片 URI */
  url: string

  /** 本地资源原始宽度 */
  width?: number

  /** 本地资源原始高度 */
  height?: number
}
