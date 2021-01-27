/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:17:35
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
          <Iconfont name='search' size={14} color={_.colorTinygrailText} />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(SearchInput)

const memoStyles = _.memoStyles(_ => ({
  wrap: {
    paddingHorizontal: 6,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1,
    borderRadius: _.radiusXs
  },
  input: {
    paddingVertical: 4,
    height: 24,
    padding: 0,
    ..._.fontSize(11),
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  }
}))
