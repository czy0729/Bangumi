/*
 * @Author: czy0729
 * @Date: 2026-09-18 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-18 06:00:00
 */

export type Props = {
  /**
   * 图片地址
   *  - 直连地址与「已按节点改写」的地址均可, 组件内部会再走一次统一解析 (幂等)
   *  - 不要在这里传本地资源, 视差背景只用于远程图
   * */
  src?: string

  /** 确定加载失败后回退的地址 (一般为官方头像直连地址), 只回退一次 */
  fallbackSrc?: string

  /** 模糊半径 (由调用方按平台算好, 组件不做平台判断) */
  blurRadius?: number
}
