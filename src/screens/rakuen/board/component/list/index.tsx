/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:15:31
 */
import { observer } from 'mobx-react'
import { Flex, Mesume, ScrollView, Text } from '@components'
import { _, useStore } from '@stores'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

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
    <ScrollView contentContainerStyle={_.container.bottom}>
      {list.map(item => (
        <Item key={item.href} {...item} />
      ))}
    </ScrollView>
  )
}

export default observer(List)
