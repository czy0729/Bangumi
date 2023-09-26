/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-27 06:43:32
 */
import React from 'react'
import { Flex, Input } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SearchBar(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { value } = $.state
  return (
    <Flex style={styles.searchBar}>
      <Flex.Item flex={1.2}>
        <Input
          style={styles.searchIpt}
          value={value}
          returnKeyType='search'
          returnKeyLabel='查询'
          placeholder='输入用户 ID'
          onChange={$.onChange}
          onSubmitEditing={$.doSearch}
        />
      </Flex.Item>
      {/* <View style={styles.split} />
      <Flex.Item>
        <Input
          style={styles.searchIpt}
          value={e}
          keyboardType='numeric'
          returnKeyType='search'
          returnKeyLabel='查询'
          placeholder='权重 0-5'
          onChange={$.onChangeE}
          onSubmitEditing={$.doSearch}
        />
      </Flex.Item> */}
    </Flex>
  )
}

export default obc(SearchBar)
