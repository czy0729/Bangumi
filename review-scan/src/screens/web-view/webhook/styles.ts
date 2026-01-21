/*
 * @Author: czy0729
 * @Date: 2023-03-10 18:58:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:36:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.headerHeight + _.sm,
    paddingHorizontal: _.wind
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  input: {
    marginTop: _.md,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  scrollView: {
    paddingBottom: _.bottom
  },
  item: {
    padding: _.md,
    marginBottom: _.md,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
