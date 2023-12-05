/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-12 15:39:20
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Header from '../header'
import { Ctx } from '../types'
import { REFRESH_CONTROL_PROPS, renderItem } from './utils'

function List({ forwardRef, onScroll, onScrollIntoViewIfNeeded }, { $ }: Ctx) {
  rerender('Subject.List')

  return (
    <ListView
      ref={forwardRef}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.subjectComments}
      scrollEventThrottle={4}
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
