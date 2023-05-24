/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 12:54:56
 */
import React from 'react'
import { Input } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SearchBar(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { value } = $.state
  return (
    <Input
      style={styles.searchIpt}
      value={value}
      returnKeyType='search'
      returnKeyLabel='查询'
      placeholder='输入用户 ID'
      autoFocus
      onChange={$.onChange}
      onSubmitEditing={$.doSearch}
    />
  )
}

export default obc(SearchBar)
