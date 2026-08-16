/*
 * @Author: czy0729
 * @Date: 2026-08-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 00:00:00
 */
import type { Props as TimelineProps } from '../types'

type P3 = NonNullable<TimelineProps['p3']>
type Image = ReadonlyArray<NonNullable<TimelineProps['image']>[number]>
type P3Text = ReadonlyArray<P3['text'][number]>

export type Props = {
  /** 封面或人物头像 */
  image: Image

  /** 位置 3 文字 */
  p3Text: P3Text

  /** 位置 3 地址 */
  p3Url: P3['url']

  /** 点击跳转回调 */
  onNavigate: (url: string, passParams?: object) => void
}
