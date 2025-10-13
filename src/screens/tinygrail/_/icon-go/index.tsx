/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 23:20:18
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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
