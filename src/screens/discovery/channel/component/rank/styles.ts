/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:37:25
 */
import { _ } from '@stores'
import { COVER_WIDTH, COVER_HEIGHT, COVER_WIDTH_SM, COVER_HEIGHT_SM } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingHorizontal: _.wind
  },
  itemLg: {
    width: '100%',
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginBottom: 4
  },
  image: {
    width: COVER_WIDTH
  },
  item: {
    width: '48%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  content: {
    height: COVER_HEIGHT - 2 * _.xs
  },
  imageSm: {
    width: COVER_WIDTH_SM
  },
  contentSm: {
    height: COVER_HEIGHT_SM
  },
  itemMarginLeft: {
    marginLeft: '4%'
  }
}))
