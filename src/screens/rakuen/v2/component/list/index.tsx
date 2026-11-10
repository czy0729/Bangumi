/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 板块列表
 */
import { useCallback, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading, Text } from '@components'
import { Login } from '@_'
import { _, userStore, useStore } from '@stores'
import i18n from '@constants/i18n'
import { getDataSourceKey, isMyReplyType, isWataameType } from '../../store/utils'
import { ITEM_HEIGHT } from '../item/ds'
import { useListStyle } from './hooks'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM, INITIAL_NUM_TO_RENDER } from './ds'

import type { Ctx } from '../../types'
import type { HandleRef, Props } from './types'

function List({ index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const style = useListStyle()

  const handleRef = useCallback<HandleRef>(
    ref => {
      $.connectRef(ref, index)
    },
    [$, index]
  )

  const elPoweredBy = useMemo(
    () => (
      <Text
        style={_.mt.lg}
        type='icon'
        size={11}
        align='center'
        onPress={() =>
          navigation.push('Zone', {
            userId: 'wataame'
          })
        }
      >
        Powered by ry.mk · @wataame
      </Text>
    ),
    [navigation]
  )

  const type = $.type(index)
  const isWataame = isWataameType(type)
  const needsAccount = isMyReplyType(type)
  const wataameError = isWataame && $.state.wataame._error
  const wataameMoreError = isWataame && $.state.wataame._moreError
  const wataameEmpty = !$.state.wataame.list.length
  const elWataameFooter = wataameError || wataameMoreError ? (
    <Text
      style={_.mt.lg}
      type='icon'
      size={11}
      align='center'
      onPress={wataameMoreError && !wataameEmpty ? $.onFooterRefresh : $.onHeaderRefresh}
    >
      加载失败，点击重试
    </Text>
  ) : (
    elPoweredBy
  )

  const page = $.state.page
  const myId = userStore.myId
  const wataameUserId = $.state.wataame._userId
  const wataameSource = $.state.wataame._source
  useEffect(() => {
    if (
      isWataame &&
      index === page &&
      (!needsAccount || !!myId) &&
      ((wataameError && wataameEmpty) ||
        wataameSource !== getDataSourceKey(type) ||
        (needsAccount && wataameUserId !== myId))
    ) {
      void $.shouldFetchRakuen(index)
    }
  }, [
    $,
    type,
    index,
    page,
    isWataame,
    needsAccount,
    myId,
    wataameError,
    wataameEmpty,
    wataameUserId,
    wataameSource
  ])

  if (needsAccount && !myId) {
    return <Login text={`我回复需${i18n.login()}才能显示`} btnText={`去${i18n.login()}`} />
  }

  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) return <Loading />

  return (
    <ListView
      key={type}
      ref={handleRef}
      skipEnteringExitingAnimations={ENTERING_EXITING_ANIMATIONS_NUM}
      keyExtractor={keyExtractor}
      contentContainerStyle={style}
      progressViewOffset={style.paddingTop}
      data={rakuen}
      renderItem={renderItem}
      initialNumToRender={INITIAL_NUM_TO_RENDER}
      estimatedItemHeight={ITEM_HEIGHT}
      scrollEventThrottle={16}
      showMesume={!isWataame}
      footerEmptyDataComponent={isWataame ? elWataameFooter : undefined}
      footerNoMoreDataComponent={isWataame ? elWataameFooter : undefined}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={isWataame ? $.onFooterRefresh : undefined}
    />
  )
}

export default observer(List)
