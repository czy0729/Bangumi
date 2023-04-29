/*
 * @Author: czy0729
 * @Date: 2023-01-10 06:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:49:56
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    minHeight: 84,
    marginTop: _.md,
    marginBottom: _.lg
  },
  item: {
    paddingRight: _.sm,
    paddingBottom: _.xs,
    marginRight: _.sm
  },
  touch: {
    paddingHorizontal: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
