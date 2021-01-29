/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 00:21:21
 */
import React from 'react'
import { Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants/model'

function SearchBar(props, { $ }) {
  const styles = memoStyles()
  const { cat, value } = $.state
  return (
    <Input
      style={[
        styles.searchIpt,
        MODEL_SEARCH_CAT.getLabel(cat) === '人物' && styles.radius
      ]}
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

const memoStyles = _.memoStyles(_ => ({
  searchIpt: {
    height: 34,
    paddingHorizontal: _._wind,
    ..._.fontSize(12),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 0
  },
  radius: {
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34
  }
}))
