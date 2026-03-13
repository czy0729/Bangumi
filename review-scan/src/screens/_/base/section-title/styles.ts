/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:34:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 02:32:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    paddingHorizontal: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  title: {
    width: 3,
    height: 18,
    marginTop: 1,
    marginRight: 10,
    marginLeft: 2,
    borderRadius: 2,
    overflow: 'hidden'
  },
  titleMain: {
    backgroundColor: _.colorMain
  },
  titleWarning: {
    backgroundColor: _.colorWarning
  },
  titlePrimary: {
    backgroundColor: _.colorPrimary
  },
  titleSuccess: {
    backgroundColor: _.colorSuccess
  }
}))
