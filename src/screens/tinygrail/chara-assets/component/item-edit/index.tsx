/*
 * @Author: czy0729
 * @Date: 2020-05-03 14:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:41:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import Item from '@tinygrail/_/item'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ItemEdit({ item, type, users, event }) {
  const { $ } = useStore<Ctx>()
  const { editing, editingIds } = $.state
  const { id, monoId, state } = item
  const isActive = editingIds[id]
  const el = (
    <Flex style={editing && styles.item}>
      {!!editing && (
        <View style={styles.icon}>
          <Iconfont
            name={isActive ? 'md-radio-button-on' : 'md-radio-button-off'}
            color={isActive ? _.colorBid : _.colorTinygrailText}
          />
        </View>
      )}
      <Flex.Item pointerEvents={editing ? 'none' : undefined}>
        <Item
          style={editing && styles.edit}
          {...item}
          type={type}
          users={users === 'ico' ? $.mpiUsers[monoId] : users}
          event={event}
          showMenu={!editing}
          withoutFeedback={editing}
        />
      </Flex.Item>
    </Flex>
  )

  if (editing) {
    return <Touchable onPress={() => $.toggleEditingId(id, state)}>{el}</Touchable>
  }

  return el
}

export default ob(ItemEdit, COMPONENT)
