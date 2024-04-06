/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:38:24
 */
import { _ } from '@stores'
import { COVER_WIDTH_SM } from '../rank/ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingHorizontal: _.wind,
    marginTop: _.sm
  },
  item: {
    width: '47.5%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  itemMarginLeft: {
    marginLeft: '5%'
  },
  image: {
    width: COVER_WIDTH_SM
  }
}))
