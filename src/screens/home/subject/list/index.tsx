/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 04:33:04
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Header from '../header'
import { Ctx } from '../types'
import { REFRESH_CONTROL_PROPS, renderItem } from './utils'

function List({ forwardRef, onScrollIntoViewIfNeeded, onScroll }, { $ }: Ctx) {
  // global.rerender('Subject.List')

  return (
    <ListView
      ref={forwardRef}
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
      ListHeaderComponent={
        <Header onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded} />
      }
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default obc(List)
