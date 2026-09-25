/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:25:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '29%',
    height: 88,
    marginBottom: _.md,
    marginHorizontal: '2.1%'
  },
  btn: {
    height: '100%',
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderWidth: 1,
    borderColor: _.colorIcon,
    borderStyle: 'dashed',
    borderRadius: _.radiusSm
  },
  inner: {
    height: '100%'
  },
  form: {
    width: '100%',
    marginTop: _.sm
  }
}))
