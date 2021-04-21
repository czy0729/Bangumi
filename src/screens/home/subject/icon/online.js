/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 17:22:30
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconOnline(props, { $ }) {
  if ($.isLimit) {
    return null
  }

  return (
    <Popover style={styles.touch} data={$.onlineOrigins} onSelect={$.onlinePlaySelected}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-airplay' size={18} />
      </Flex>
      <Heatmap right={55} bottom={-7} id='条目.搜索源' />
    </Popover>
  )
}

export default obc(IconOnline)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
