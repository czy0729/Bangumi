/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-11 15:09:30
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { FooterEmptyData, ListView } from '@components'
import { _, systemStore, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { TEXT_18X } from '@constants'
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

  const { showComment } = systemStore.setting
  const { nsfw } = $
  const elFooterEmpty = useMemo(
    () =>
      showComment === -1 ? (
        <View />
      ) : nsfw ? (
        <FooterEmptyData style={_.container.plain} text={TEXT_18X} />
      ) : undefined,
    [nsfw, showComment]
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
      footerEmptyDataComponent={elFooterEmpty}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchSubjectComments}
    />
  )
}

export default observer(List)
