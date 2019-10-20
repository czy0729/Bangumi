/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-20 17:33:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Touchable, Text } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorText, colorPlain, colorContainer } from '../styles'

function SearchBar(props, { $, navigation }) {
  const { value } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Input
          style={styles.searchIpt}
          value={value}
          keyboardType='numeric'
          returnKeyType='search'
          placeholder='输入角色id直达...'
          placeholderTextColor={colorText}
          autoFocus
          onChange={$.onChange}
          onSubmitEditing={() => $.doSearch(navigation)}
        />
      </Flex.Item>
      <Touchable
        style={_.ml.sm}
        size='sm'
        onPress={() => $.doSearch(navigation)}
      >
        <Flex style={styles.btn} justify='center'>
          <Text
            style={{
              color: colorText
            }}
            size={14}
          >
            前往
          </Text>
        </Flex>
      </Touchable>
    </Flex>
  )
}

SearchBar.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(SearchBar)

const styles = StyleSheet.create({
  searchIpt: {
    height: 34,
    paddingHorizontal: _.wind,
    fontSize: 14 + _.fontSizeAdjust,
    color: colorPlain,
    backgroundColor: colorContainer,
    borderColor: colorText,
    borderWidth: 1,
    borderRadius: 64
  },
  btn: {
    width: 80,
    height: 34,
    borderRadius: 64,
    backgroundColor: colorContainer,
    borderColor: colorText,
    borderWidth: 1
  }
})
