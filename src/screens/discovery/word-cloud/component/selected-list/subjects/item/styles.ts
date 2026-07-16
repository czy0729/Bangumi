/*
 * @Author: czy0729
 * @Date: 2024-09-27 03:57:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:06:49
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    minHeight: 130,
    paddingBottom: 16
  },
  image: {
    marginBottom: 8,
    ..._.shadow
  },
  title: {
    marginBottom: 2
  },
  sub: {
    marginTop: 2,
    transform: [
      {
        scale: 0.88
      }
    ]
  },
  stars: {
    marginTop: _.xs,
    transform: [
      {
        scale: _.web(0.8, 0.92)
      }
    ]
  }
})
