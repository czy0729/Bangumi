/*
 * @Author: czy0729
 * @Date: 2023-11-27 16:33:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:49:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: Math.floor(_.window.height * 0.72),
    paddingHorizontal: 48
  },
  item: {
    width: '100%'
  },
  input: {
    height: 40,
    marginTop: 48,
    paddingVertical: 0,
    textAlign: 'center',
    ..._.fontSize14,
    borderRadius: 20
  },
  arrow: {
    padding: 2,
    marginLeft: _.sm,
    borderWidth: 2,
    borderColor: _.colorIcon,
    borderRadius: 20
  }
}))
