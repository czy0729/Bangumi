/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:30:07
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import HeaderComponent from '../header-component'
import { renderItem } from './utils'
import { COMPONENT, REFRESH_CONTROL_PROPS } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ forwardRef, onScrollIntoViewIfNeeded, onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeader = useMemo(
    () => (
      <HeaderComponent
        onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
        onBlockRef={onBlockRef}
      />
    ),
    [onBlockRef, onScrollIntoViewIfNeeded]
  )

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
      ListHeaderComponent={elHeader}
      renderItem={renderItem}
      footerEmptyDataComponent={$.footerEmptyDataComponent}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default observer(List)
