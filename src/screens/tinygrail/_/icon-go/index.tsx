/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 18:43:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { styles } from './styles'

const DATA = ['资产重组', '买入', '卖出', 'K线'] as const

const HIT_SLOP = {
  top: 4,
  right: 8,
  bottom: 4,
  left: 8
} as const

function IconGo({ $ }) {
  const { go } = $.state
  return (
    <Popover
      style={styles.touch}
      data={DATA}
      // @ts-ignore
      hitSlop={HIT_SLOP}
      onSelect={$.onSelectGo}
    >
      <Flex>
        <Iconfont name='md-read-more' size={24} color={_.colorTinygrailPlain} />
        <Text style={_.ml.xs} type='tinygrailPlain' size={13} bold>
          {go}
        </Text>
      </Flex>
    </Popover>
  )
}

export default observer(IconGo)
