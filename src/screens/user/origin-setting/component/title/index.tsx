/*
 * @Author: czy0729
 * @Date: 2022-03-23 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 03:54:17
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { OriginItem } from '../../utils'
import { COMPONENT } from './ds'

const Title = ({ type, name }, { $ }: Ctx) => {
  const data = ($.data[type] as OriginItem[]).filter(item => item.active === 1)
  const activeData = data.map(item => item.name)
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
        onSelect={name => {
          if (name === '空') return

          const item = data.find(item => item.name === name)
          $.go({
            type,
            url: item.url
          })
        }}
      >
        <Flex>
          <Iconfont name='md-airplay' size={18} color={_.colorSub} />
          <Text style={_.ml.sm} type='sub' lineHeight={15} bold>
            预览
          </Text>
        </Flex>
      </Popover>
    </Flex>
  )
}

export default obc(Title, COMPONENT)
