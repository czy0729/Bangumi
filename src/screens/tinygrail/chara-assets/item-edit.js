/*
 * @Author: czy0729
 * @Date: 2020-05-03 14:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:10:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../_/item'

function ItemEdit({ index, item, type, users, event }, { $ }) {
  const { editing, editingIds } = $.state
  const { id, monoId, state } = item
  const isActive = editingIds[id]
  let _users
  if (users === 'ico') {
    _users = $.mpiUsers[monoId]
  }
  return (
    <Touchable
      withoutFeedback={!editing}
      onPress={editing ? () => $.toggleEditingId(id, state) : undefined}
    >
      <Flex style={editing && styles.item}>
        {!!editing && (
          <View style={[styles.icon, _.mr.sm]}>
            <Iconfont
              name={isActive ? 'radio-select' : 'radio'}
              color={isActive ? _.colorBid : _.colorTinygrailText}
            />
          </View>
        )}
        <Flex.Item pointerEvents={editing ? 'none' : undefined}>
          <Item
            style={editing && styles.edit}
            index={index}
            {...item}
            type={type}
            users={_users || users}
            event={event}
            showMenu={!editing}
            withoutFeedback={editing}
          />
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default obc(ItemEdit)

const styles = _.create({
  item: {
    paddingLeft: _.wind - _._wind + _.sm,
    paddingRight: _.sm + 2
  },
  edit: {
    paddingLeft: 0
  },
  icon: {
    padding: _.sm
  }
})
