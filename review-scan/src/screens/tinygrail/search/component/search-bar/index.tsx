/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:46:40
 */
import React from 'react'
import { Activity, Flex, Input, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SearchBar() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { value, searching } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Input
          style={styles.searchIpt}
          value={value}
          placeholder='输入角色名字或ID'
          placeholderTextColor={_.colorTinygrailText}
          autoFocus
          returnKeyType='search'
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

export default ob(SearchBar, COMPONENT)
