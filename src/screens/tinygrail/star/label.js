/*
 * @Author: czy0729
 * @Date: 2021-03-12 14:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 14:05:30
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const labelDS = ['全局', '持仓']

function Label({ $ }) {
  const { label } = $.state
  return (
    <SegmentedControl
      style={styles.segment}
      type='tinygrailPlain'
      tintColor={_.colorTinygrailContainer}
      backgroundColor={_.colorTinygrailBg}
      size={11}
      values={labelDS}
      selectedIndex={labelDS.findIndex(item => item === label)}
      onValueChange={$.setLabel}
    />
  )
}

export default obc(Label)

const styles = _.create({
  segment: {
    width: 80,
    height: 22
  }
})
