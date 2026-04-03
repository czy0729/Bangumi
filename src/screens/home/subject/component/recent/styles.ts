/*
 * @Author: czy0729
 * @Date: 2022-08-26 02:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 19:44:53
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    minHeight: 86,
    marginTop: 28
  },
  containerNotShow: {
    minHeight: 'auto'
  },
  hide: {
    marginTop: _.lg,
    marginBottom: -_.sm
  },
  item: {
    paddingRight: _.sm,
    paddingBottom: _.xs,
    marginRight: _.sm
  }
})
