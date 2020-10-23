/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-23 10:08:01
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

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
      onChange={$.onChange}
      onSubmitEditing={() => $.doSearch(true)}
    />
  )
}

SearchBar.contextTypes = {
  $: PropTypes.object
}

export default observer(SearchBar)

const memoStyles = _.memoStyles(_ => ({
  searchIpt: {
    height: 34,
    paddingHorizontal: _._wind,
    ..._.fontSize(12),
    backgroundColor: _.colorPlain,
    borderRadius: 34
  }
}))
