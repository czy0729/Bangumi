/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-11 00:16:13
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Input } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

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
        <Touchable onPress={onSubmitEditing}>
          <Iconfont
            style={styles.search}
            name='search'
            size={14}
            color={_.colorTinygrailText}
          />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(SearchInput)

const memoStyles = _.memoStyles(_ => ({
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
