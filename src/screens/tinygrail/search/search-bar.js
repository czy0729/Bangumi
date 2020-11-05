/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-05 16:34:34
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Input, Touchable, Text, Activity } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function SearchBar(props, { $, navigation }) {
  const styles = memoStyles()
  const { value, searching } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Input
          style={styles.searchIpt}
          value={value}
          keyboardType='numeric'
          returnKeyType='search'
          placeholder='输入角色名字或id'
          placeholderTextColor={_.colorTinygrailText}
          autoFocus
          onChange={$.onChange}
          onSubmitEditing={() => $.doSearch(navigation)}
        />
      </Flex.Item>
      <Touchable
        style={_.ml.sm}
        size='sm'
        onPress={() => {
          if (searching) return
          $.doSearch(navigation)
        }}
      >
        <Flex style={styles.btn} justify='center'>
          <Text type='tinygrailText'>查询</Text>
          {searching && (
            <Flex style={styles.activity}>
              <Activity />
            </Flex>
          )}
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

const memoStyles = _.memoStyles(_ => ({
  searchIpt: {
    height: 34,
    paddingHorizontal: _.wind,
    fontSize: 14 + _.fontSizeAdjust,
    color: _.colorTinygrailPlain,
    backgroundColor: _.colorTinygrailContainer,
    borderColor: _.colorTinygrailText,
    borderWidth: 1,
    borderRadius: 64
  },
  btn: {
    width: 80,
    height: 34,
    borderRadius: 64,
    backgroundColor: _.colorTinygrailContainer,
    borderColor: _.colorTinygrailText,
    borderWidth: 1
  },
  activity: {
    transform: [
      {
        scale: 0.64
      }
    ]
  }
}))
