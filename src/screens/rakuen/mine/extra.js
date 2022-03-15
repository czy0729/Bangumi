/*
 * @Author: czy0729
 * @Date: 2022-02-24 18:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 22:23:37
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const typeDS = ['我的', '全部']
let type

function Extra({ $ }) {
  // 缓存最近一次确定值
  if ($) type = $.state.type

  const currentType = $?.state.type === undefined ? type : $?.state.type
  return (
    <SegmentedControl
      key={currentType}
      style={styles.segment}
      size={11}
      values={typeDS}
      selectedIndex={currentType === 'mine' ? 0 : 1}
      onValueChange={$?.onChange}
    />
  )
}

export default ob(Extra)

const styles = _.create({
  segment: {
    width: _.r(80),
    height: _.r(22),
    marginRight: _.sm
  }
})
