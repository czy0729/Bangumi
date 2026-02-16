/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:34:43
 */
import React from 'react'
import { Flex, Mesume, ScrollView, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const { list, _loaded } = $.board
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
    <ScrollView contentContainerStyle={_.container.page}>
      {list.map(item => (
        <Item key={item.href} {...item} />
      ))}
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
