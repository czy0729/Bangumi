/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-28 09:31:47
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Input } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const hitSlop = {
  top: 6,
  right: 4,
  bottom: 6,
  left: 6
}

function SearchInput({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  ...other
}) {
  const styles = memoStyles()
  return (
    <Flex style={styles.wrap}>
      <Flex.Item>
        <Input
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={_.colorTinygrailText}
          value={String(value)}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...other}
        />
      </Flex.Item>
      {!!onSubmitEditing && (
        <Touchable hitSlop={hitSlop} onPress={onSubmitEditing}>
          <Iconfont
            style={styles.search}
            name='md-search'
            size={14}
            color={_.colorTinygrailText}
          />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(SearchInput)

const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingLeft: 8,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 26,
    padding: 0,
    ..._.fontSize(10),
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  search: {
    marginRight: 6
  }
}))
