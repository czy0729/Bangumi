/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:18:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:47:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  userWrap: {
    height: 42
  },
  html: {
    minHeight: 120
  },
  loading: {
    height: 240
  },
  title: {
    paddingLeft: _.wind,
    marginTop: _.md,
    marginBottom: _.md
  },
  head: {
    paddingVertical: 20,
    marginVertical: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: _.colorBorder
  }
}))
