/*
 * @Author: czy0729
 * @Date: 2020-05-03 14:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 13:53:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Touchable } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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
          <IconTouchable
            style={_.mr.sm}
            name={isActive ? 'radio-select' : 'radio'}
            size={20}
            color={isActive ? _.colorBid : _.colorTinygrailText}
          />
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

ItemEdit.contextTypes = {
  $: PropTypes.object
}

export default observer(ItemEdit)

const styles = StyleSheet.create({
  item: {
    paddingLeft: _.wind - _._wind + _.sm,
    paddingRight: _.sm + 2
  },
  edit: {
    paddingLeft: 0
  }
})
