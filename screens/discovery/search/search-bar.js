/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-05 14:35:51
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Input } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

function SearchBar(props, { $ }) {
  const { value } = $.state
  return (
    <Input
      style={styles.searchIpt}
      value={value}
      returnKeyType='search'
      placeholder='搜索...'
      onChange={$.onChange}
      onSubmitEditing={() => $.doSearch(true)}
    />
  )
}

SearchBar.contextTypes = {
  $: PropTypes.object
}

export default observer(SearchBar)

const styles = StyleSheet.create({
  searchIpt: {
    height: 34,
    paddingHorizontal: _.wind,
    fontSize: 12,
    lineHeight: 14,
    backgroundColor: _.colorPlain,
    borderRadius: 64
  }
})
