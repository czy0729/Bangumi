/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:16:24
 */
import React from 'react'
import { Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function SearchBar(props, { $ }) {
  const styles = memoStyles()
  const { value } = $.state
  return (
    <Input
      style={styles.searchIpt}
      value={value}
      returnKeyType='search'
      returnKeyLabel='搜索'
      placeholder='输入关键字'
      autoFocus
      onChange={$.onChange}
      onSubmitEditing={() => $.doSearch(true)}
    />
  )
}

export default obc(SearchBar)

const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 34,
    paddingHorizontal: _._wind,
    ..._.fontSize(12),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 34
  }
}))
