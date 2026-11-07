/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 收藏分组列表
 */
import { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TAB_PAGE } from '../../ds'
import Footer from './footer'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ReactElement } from 'react'
import type { SectionListViewProps } from '@components/list-view/types'
import type { Ctx, ForwardRefTarget } from '../../types'
import type { Props } from './types'
import type { Section, SectionItem } from './utils'

/** 分组列表, 列表库的 Props 只按 FlatList 建模, 这里补上 SectionList 的 render props 类型 */
const SectionListView = ListView as unknown as (
  props: SectionListViewProps<SectionItem, Section>
) => ReactElement

function BangumiList({ ListHeaderComponent, onScroll }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elFooter = useMemo(() => <Footer />, [])

  /** iOS 才需要 scroll 同步 */
  const handleScrollEvent = useMemo(() => {
    if (ANDROID) return undefined

    return Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: $.scrollY
            }
          }
        }
      ],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: onScroll
      }
    )
  }, [$, onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: ForwardRefTarget | null) => {
      if (ANDROID) return

      $.forwardRef(ref, TAB_PAGE.collection)
    },
    [$]
  )

  const styles = memoStyles()

  if (!$.userCollections._loaded) {
    if (ANDROID) {
      return (
        <View style={styles.nestScrollLoading}>
          <Loading.Raw />
        </View>
      )
    }

    return <Loading style={styles.loading} />
  }

  return (
    <Component id='screen-zone-tab-view' data-type='bangumi-list'>
      <SectionListView
        ref={handleRef}
        nestedScrollEnabled={ANDROID}
        keyExtractor={keyExtractor}
        contentContainerStyle={ANDROID ? styles.nestScroll : styles.contentContainerStyle}
        animated={!ANDROID}
        sections={$.sections}
        showFooter={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListHeaderComponent={!ANDROID ? ListHeaderComponent : undefined}
        ListFooterComponent={elFooter}
        onScroll={handleScrollEvent}
      />
    </Component>
  )
}

export default observer(BangumiList)
