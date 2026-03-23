/*
 * @Author: czy0729
 * @Date: 2022-03-23 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:48:09
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { OriginItem } from '../../utils'

function Title({ type, name }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const data = ($.data[type] as OriginItem[]).filter(item => item.active === 1)
  const activeData = data.map(item => item.name)

  const handleSelect = useCallback(
    (label: string) => {
      if (label === '空') return

      const item = data.find(item => item.name === label)
      $.go({
        type,
        url: item.url
      })
    },
    [$, data, type]
  )

  return (
    <Flex style={_.mb.sm}>
      <Flex.Item>
        <Text size={20} bold>
          {name}
        </Text>
      </Flex.Item>
      <Popover
        style={_.ml.md}
        data={activeData.length ? activeData : ['空']}
        onSelect={handleSelect}
      >
        <Flex>
          <Iconfont name='md-airplay' size={17} color={_.colorSub} />
          <Text style={_.ml.sm} type='sub' size={13} lineHeight={14} bold>
            测试
          </Text>
        </Flex>
      </Popover>
    </Flex>
  )
}

export default observer(Title)
