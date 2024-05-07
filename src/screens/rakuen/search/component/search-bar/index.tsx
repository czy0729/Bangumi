/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:11:45
 */
import React from 'react'
import { Input } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SearchBar(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <Input
      style={styles.searchIpt}
      value={$.state.value}
      returnKeyType='search'
      returnKeyLabel='搜索'
      placeholder='输入关键字，多关键字空格隔开'
      autoFocus
      onChange={$.onChange}
      onSubmitEditing={$.doSearch}
    />
  )
}

export default obc(SearchBar, COMPONENT)
