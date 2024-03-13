/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 19:48:10
 */
import React from 'react'
import { Flex, Input } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SearchBar(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <Flex style={styles.searchBar}>
      <Input
        style={styles.searchIpt}
        value={$.state.value}
        returnKeyType='search'
        returnKeyLabel='查询'
        placeholder='输入用户 ID'
        onChange={$.onChange}
        onSubmitEditing={$.doSearchV2}
      />
    </Flex>
  )
}

export default obc(SearchBar, COMPONENT)
