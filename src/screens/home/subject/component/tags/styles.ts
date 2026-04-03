/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:34:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:43:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 128,
    marginTop: 36,
    marginBottom: _.sm
  },
  containerExpand: {
    minHeight: 256
  },
  containerNotShow: {
    minHeight: 'auto',
    marginBottom: _.md
  },
  tags: {
    minHeight: 64,
    paddingHorizontal: _.wind,
    marginTop: 22
  },
  more: {
    paddingVertical: _.md,
    paddingHorizontal: 100,
    marginTop: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  split: {
    marginTop: 0,
    marginBottom: 24
  }
}))
