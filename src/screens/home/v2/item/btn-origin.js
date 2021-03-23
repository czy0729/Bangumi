/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-23 19:39:13
 */
import React from 'react'
import { Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'

function BtnOrigin({ subjectId, subject }, { $ }) {
  if (!$.homeOrigin || userStore.isLimit) {
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
      <Iconfont style={styles.icon} name='md-airplay' size={17} />
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default obc(BtnOrigin)

const styles = _.create({
  btn: {
    paddingLeft: _.sm,
    paddingRight: _.sm + 4
  },
  icon: {
    marginBottom: -1
  }
})
