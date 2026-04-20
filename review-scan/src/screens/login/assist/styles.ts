/*
 * @Author: czy0729
 * @Date: 2022-09-02 17:17:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-02 17:17:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.lg
  },
  code: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  copy: {
    position: 'absolute',
    top: _.sm,
    right: _.sm,
    padding: _.sm
  },
  input: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
