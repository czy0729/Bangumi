/*
 * @Author: czy0729
 * @Date: 2022-03-23 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:28:18
 */
import React from 'react'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const Title = ({ type, name }, { $ }: Ctx) => {
  const data = $.data[type].filter(item => item.active === 1)
  const activeData = data.map(item => item.name)
  return (
    <Flex>
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
        <Iconfont name='md-airplay' size={20} color={_.colorDesc} />
      </Popover>
    </Flex>
  )
}

export default obc(Title)
