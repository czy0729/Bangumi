/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:08:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-27 16:08:55
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    position: 'absolute',
    elevation: 2,
    top: 0,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: '#a4a4a4'
  },
  overflowHeader: {
    backgroundColor: 'transparent'
  }
})
