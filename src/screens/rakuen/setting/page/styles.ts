/*
 * @Author: czy0729
 * @Date: 2022-08-22 15:49:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-14 03:44:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.bottom
  },
  segmentedControl: {
    height: _.r(32),
    width: _.r(184)
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  icon: {
    width: 36,
    height: 36
  },
  information: {
    maxWidth: '80%',
    marginTop: _.xs
  },
  section: {
    paddingVertical: _.sm,
    paddingRight: _.sm,
    paddingLeft: _._wind
  },
  input: {
    height: 44,
    paddingVertical: 0
  },
  acSearchPopable: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingLeft: _._wind
  }
}))
