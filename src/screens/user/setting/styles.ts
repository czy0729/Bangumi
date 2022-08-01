/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 17:53:26
 */
import { _ } from '@stores'

export default _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  segmentedControl: {
    height: _.r(28),
    width: _.r(180)
  },
  test: {
    marginTop: -8
  },
  infor: {
    paddingTop: 56,
    marginLeft: -_.sm
  }
})

export const styles = _.create({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md
  },
  transparent: {
    opacity: 0
  },
  input: {
    height: 44,
    paddingTop: 11,
    paddingBottom: 13,
    paddingHorizontal: 16,
    ..._.fontSize16,
    backgroundColor: 'transparent'
  }
})
