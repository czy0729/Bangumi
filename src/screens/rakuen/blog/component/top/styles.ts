/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:18:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 21:52:40
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  groupWrap: {
    height: 32
  },
  groupThumbWrap: {
    width: 30
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
})
