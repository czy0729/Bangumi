/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 08:41:15
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'

function BtnOrigin({ subjectId, subject }, { $ }) {
  if (!$.homeOrigin || userStore.isLimit) return null

  const { type } = subject
  if (type !== 2 && type !== 6) return null

  return (
    <Popover
      style={styles.touch}
      data={$.onlineOrigins(subjectId).map(item =>
        typeof item === 'object' ? item.name : item
      )}
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
    marginRight: _.device(4, _.sm),
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
