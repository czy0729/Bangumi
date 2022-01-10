/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 13:53:41
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
    width: 80 * _.ratio,
    height: 22 * _.ratio
  }
})
