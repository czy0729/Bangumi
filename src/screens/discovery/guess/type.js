/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-15 06:07:26
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['相似', '不同']

function Type({ $ }) {
  const { like } = $.state
  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={typeDS}
      selectedIndex={like ? 0 : 1}
      onValueChange={$.toggleLike}
    />
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: 80,
    height: 22
  }
})
