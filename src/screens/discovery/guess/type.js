/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:40:47
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['相似', '不同']

function Type({ like, onChange = Function.prototype }) {
  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={typeDS}
      selectedIndex={like ? 0 : 1}
      onValueChange={onChange}
    />
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: _.r(80),
    height: _.r(22),
    marginRight: _.xs
  }
})
