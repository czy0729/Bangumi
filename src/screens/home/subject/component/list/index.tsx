/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:03:41
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import HeaderComponent from '../header-component'
import { renderItem } from './utils'
import { COMPONENT, REFRESH_CONTROL_PROPS } from './ds'

function List({ forwardRef, onScrollIntoViewIfNeeded, onBlockRef }) {
  const { $ } = useStore<Ctx>()
  return (
    <ListView
      ref={forwardRef}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.subjectComments}
      scrollEventThrottle={16}
      scrollToTop
      keyboardDismissMode='on-drag'
      footerEmptyDataComponent={$.footerEmptyDataComponent}
      refreshControlProps={REFRESH_CONTROL_PROPS}
      ListHeaderComponent={
        <HeaderComponent
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onBlockRef={onBlockRef}
        />
      }
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default ob(List, COMPONENT)
