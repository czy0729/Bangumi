/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 14:14:00
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { topDS } from './store'

function Cate(props, { $ }) {
  const { top } = $.state
  return (
    <>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={topDS}
        selectedIndex={top}
        onValueChange={$.onChangeTop}
      />
      <SegmentedControl
        key={$.segement.key}
        style={styles.segment}
        size={11}
        values={$.segement.values}
        selectedIndex={$.segement.selectedIndex}
        onValueChange={$.onChangeSub}
      />
    </>
  )
}

export default obc(Cate)

const styles = _.create({
  segment: {
    width: _.window.width - _.wind * 2,
    height: 22 * _.ratio,
    marginLeft: _.wind,
    marginTop: _.sm
  }
})
