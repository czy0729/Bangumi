/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:24:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-27 17:24:32
 */
import { _ } from '@stores'

export const styles = _.create({
  scrollbar: {
    height: 48,
    flexGrow: 0
  },
  tabbar: {
    height: '100%',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  tab: {
    paddingHorizontal: 16
  }
})
