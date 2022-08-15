/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 13:50:05
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
  },
  acSearch: {
    paddingLeft: _._wind,
    marginTop: _.sm,
    marginBottom: _.md
  },
  closePopablePlaceholder: {
    width: '100%',
    height: 160
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
    paddingVertical: 0,
    paddingHorizontal: 17,
    ..._.fontSize16,
    backgroundColor: 'transparent'
  }
})
