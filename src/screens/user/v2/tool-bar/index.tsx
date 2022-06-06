/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 10:31:48
 */
import React from 'react'
import { View } from 'react-native'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Sort from './sort'
import Tag from './tag'
import Search from './search'
import More from './more'
import Filter from '../filter'

function ToolBar({ page, onToggleList }, { $ }) {
  global.rerender('User.ToolBar')

  const styles = memoStyles()
  const { list } = $.state
  return (
    <View style={[styles.container, list && styles.list]}>
      <CompToolBar>
        <Sort />
        <Tag page={page} />
        <Search />
        <More
          onToggleList={() => {
            onToggleList()
            $.onToggleList()
          }}
        />
      </CompToolBar>
      <Filter page={page} />
    </View>
  )
}

export default obc(ToolBar)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: _.colorPlain
  },
  list: {
    paddingBottom: 0
  }
}))
