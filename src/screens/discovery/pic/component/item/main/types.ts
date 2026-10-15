/*
 * @Author: czy0729
 * @Date: 2026-05-08 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 条目图片与长按菜单类型
 */
export type Props = {
  /** 展示宽度 */
  width: number

  /** 展示高度 */
  height: number

  /** 长按菜单项 */
  data: string[]

  /** 图片地址 (未转换的原始值) */
  image: string

  /** 点击图片查看大图 */
  onPress: () => void

  /** 菜单选择 */
  onSelect: (item: string) => void

  /** 图片加载失败 */
  onError?: () => void
}
