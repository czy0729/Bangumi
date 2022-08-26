/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:35:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:37:11
 */
import { systemStore } from '@stores'

export const DEFAULT_PROPS = {
  hideScore: false as typeof systemStore.setting.hideScore,
  showRating: true as typeof systemStore.setting.showRating
}
