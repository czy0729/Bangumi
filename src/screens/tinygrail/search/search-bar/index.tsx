/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:34:05
 */
import React from 'react'
import { Flex, Input, Touchable, Text, Activity } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SearchBar(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { value, searching } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Input
          style={styles.searchIpt}
          value={value}
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
        onPress={() => {
          if (searching) return
          $.doSearch(navigation)
        }}
      >
        <Flex style={styles.btn} justify='center'>
          {searching && (
            <Flex>
              <Activity />
            </Flex>
          )}
          <Text type='tinygrailText'>查询</Text>
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default obc(SearchBar)
