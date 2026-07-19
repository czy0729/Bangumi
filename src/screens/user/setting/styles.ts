/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:51:55
 */
import { _ } from '@stores'

export default _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.75, 1)
      }
    ]
  },
  segmentedControl: {
    height: _.r(32),
    width: _.r(172)
  },
  test: {
    marginTop: -8
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
  input: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 17,
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    ..._.fontSize16,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  input2: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 17,
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    ..._.fontSize14,
    borderWidth: 0
  }
})
