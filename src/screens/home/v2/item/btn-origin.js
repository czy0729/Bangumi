/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 14:26:37
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'

function BtnOrigin({ subjectId, subject }, { $ }) {
  if (!$.homeOrigin || userStore.isLimit) return null

  const { type } = subject
  if (type !== 2 && type !== 6) return null

  return (
    <Popover
      style={styles.touch}
      data={$.onlineOrigins(subjectId)}
      onSelect={label => $.onlinePlaySelected(label, subjectId)}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-airplay' size={17} />
      </Flex>
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default obc(BtnOrigin)

const styles = _.create({
  touch: {
    marginRight: _.device(2, _.sm),
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 34,
    height: 34
  },
  icon: {
    marginBottom: -1
  }
})
