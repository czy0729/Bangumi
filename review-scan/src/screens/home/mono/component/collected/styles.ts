/*
 * @Author: czy0729
 * @Date: 2023-01-10 06:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-12 05:56:23
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    minHeight: 84,
    marginTop: 40,
    marginBottom: _.md
  },
  item: {
    paddingRight: _.sm,
    paddingBottom: _.xs,
    marginRight: _.sm
  },
  body: {
    maxWidth: 96,
    marginLeft: _.sm
  },
  touch: {
    paddingHorizontal: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
