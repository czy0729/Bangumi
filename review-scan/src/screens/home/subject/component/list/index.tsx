/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 15:08:00
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
      keyExtractor={keyExtractor}
      keyboardDismissMode='on-drag'
      contentContainerStyle={_.container.bottom}
      data={$.subjectComments}
      scrollEventThrottle={20}
      initialNumToRender={1}
      refreshControlProps={REFRESH_CONTROL_PROPS}
      ListHeaderComponent={
        <HeaderComponent
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onBlockRef={onBlockRef}
        />
      }
      renderItem={renderItem}
      footerEmptyDataComponent={$.footerEmptyDataComponent}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default ob(List, COMPONENT)
