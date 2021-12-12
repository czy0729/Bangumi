/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-12 20:32:19
 */
import React from 'react'
import { Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants/model'

function SearchBar({ onPress }, { $ }) {
  const styles = memoStyles()
  const { cat, value } = $.state
  const label = MODEL_SEARCH_CAT.getLabel(cat)
  return (
    <Input
      style={[styles.searchIpt, ['人物', '用户'].includes(label) && styles.radius]}
      value={value}
      returnKeyType='search'
      returnKeyLabel='搜索'
      placeholder={label === '用户' ? '输入完整的用户Id' : '输入关键字'}
      autoFocus
      onChange={$.onChange}
      onSubmitEditing={onPress}
    />
  )
}

export default obc(SearchBar)

const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 34 * _.ratio,
    paddingHorizontal: _._wind,
    ..._.fontSize(_.device(12, 14)),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 0
  },
  radius: {
    borderTopRightRadius: 34 * _.ratio,
    borderBottomRightRadius: 34 * _.ratio
  }
}))
