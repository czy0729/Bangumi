/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:49:40
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { DATA, HIT_SLOP } from './ds'
import { styles } from './styles'

function IconGo({ $ }) {
  const { go } = $.state
  return (
    <Popover style={styles.touch} data={DATA} hitSlop={HIT_SLOP} onSelect={$.onSelectGo}>
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
