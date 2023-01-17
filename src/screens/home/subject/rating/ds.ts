/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:35:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:37:11
 */
import { systemStore } from '@stores'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as typeof systemStore.setting.hideScore,
  showRating: true as typeof systemStore.setting.showRating
}
