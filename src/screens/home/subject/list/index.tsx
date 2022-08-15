/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 12:37:46
 */
import React from 'react'
import {
  ListView
  // ListViewRecycler
} from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
// import { IOS } from '@constants'
import Header from '../header'
import { Ctx } from '../types'
import { REFRESH_CONTROL_PROPS, renderItem } from './utils'

function List({ onScroll }, { $ }: Ctx) {
  global.rerender('Subject.List')

  // if (!IOS) {
  //   return (
  //     <ListViewRecycler
  //       style={_.container.bottom}
  //       keyExtractor={keyExtractor}
  //       data={$.subjectComments}
  //       ListHeaderComponent={<Header />}
  //       renderItem={renderItem}
  //       onScroll={onScroll}
  //       onFooterRefresh={$.fetchSubjectComments}
  //     />
  //   )
  // }

  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.subjectComments}
      lazy={1}
      progressViewOffset={_.ios(_.statusBarHeight, 0)}
      removeClippedSubviews={false}
      scrollEventThrottle={16}
      scrollToTop
      keyboardDismissMode='on-drag'
      footerEmptyDataComponent={$.footerEmptyDataComponent}
      refreshControlProps={REFRESH_CONTROL_PROPS}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default obc(List)
