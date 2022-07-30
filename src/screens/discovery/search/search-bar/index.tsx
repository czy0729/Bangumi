/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 17:49:42
 */
import React from 'react'
import { Input } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SearchBar(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { cat, value } = $.state
  const label = MODEL_SEARCH_CAT.getLabel<SearchCatCn>(cat)
  return (
    <Input
      style={[styles.searchIpt, ['人物', '用户'].includes(label) && styles.radius]}
      value={value}
      returnKeyType='search'
      returnKeyLabel='搜索'
      placeholder={$.isUser ? '输入完整的用户Id' : '输入关键字'}
      autoFocus
      onChangeText={$.onChangeText}
      onFocus={$.onFocus}
      onBlur={$.onBlur}
      onSubmitEditing={() => $.onSubmit(navigation)}
    />
  )
}

export default obc(SearchBar)
