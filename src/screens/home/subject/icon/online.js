/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-21 16:21:51
 */
import React from 'react'
import { Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconOnline(props, { $ }) {
  if ($.isLimit) {
    return null
  }

  return (
    <Popover data={$.onlineOrigins} onSelect={$.onlinePlaySelected}>
      <Iconfont style={styles.icon} name='md-airplay' size={18} />
      <Heatmap right={55} bottom={-7} id='条目.搜索源' />
    </Popover>
  )
}

export default obc(IconOnline)

const styles = _.create({
  icon: {
    paddingHorizontal: _.sm + 2
  }
})
