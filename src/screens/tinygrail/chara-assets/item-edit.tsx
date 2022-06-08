/*
 * @Author: czy0729
 * @Date: 2020-05-03 14:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-08 11:52:32
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '@tinygrail/_/item'

function ItemEdit({ item, type, users, event }, { $ }) {
  const { editing, editingIds } = $.state
  const { id, monoId, state } = item
  const isActive = editingIds[id]
  return (
    <Touchable
      withoutFeedback={!editing}
      onPress={editing ? () => $.toggleEditingId(id, state) : undefined}
    >
      <Flex style={editing && styles.item}>
        {!!editing && (
          <View style={[styles.icon, _.mr.sm]}>
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
