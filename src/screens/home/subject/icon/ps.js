/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:32:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:34:53
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconPS(props, { $ }) {
  if (!$.isPS) {
    return null
  }

  return (
    <IconTouchable style={styles.icon} name='trophy' onPress={$.toPSNINE}>
      <Heatmap id='条目.查看奖杯' />
    </IconTouchable>
  )
}

export default obc(IconPS)

const styles = _.create({
  icon: {
    marginRight: -_.sm
  }
})
