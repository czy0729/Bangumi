/*
 * @Author: czy0729
 * @Date: 2024-06-05 20:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 08:08:19
 */
import React from 'react'
import { Flex, Mesume, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List(_props, { $ }: Ctx) {
  const { list, _loaded } = $.myReply
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume />
        <Text style={_.mt.sm} type='sub'>
          好像什么都没有
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollView>
      {list.map(item => (
        <Item key={item.href} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
