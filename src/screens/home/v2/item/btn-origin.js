/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 14:54:17
 */
import React from 'react'
import { Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnOrigin({ subjectId, subject }, { $ }) {
  if (!$.homeOrigin) {
    return null
  }

  const { type } = subject
  if (type !== 2 && type !== 6) {
    return null
  }

  return (
    <Popover
      style={styles.btn}
      data={$.onlineOrigins(subjectId)}
      onSelect={label => $.onlinePlaySelected(label, subjectId)}
    >
      <Iconfont style={styles.icon} name='xin-fan' size={18} />
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default obc(BtnOrigin)

const styles = _.create({
  btn: {
    paddingLeft: _.sm,
    paddingRight: _.sm + 2
  },
  icon: {
    marginBottom: -1
  }
})
