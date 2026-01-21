/*
 * @Author: czy0729
 * @Date: 2023-11-27 16:33:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 02:01:55
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    minHeight: _.window.height * 0.72,
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
})
