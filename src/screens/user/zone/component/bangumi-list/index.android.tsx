/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:02:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:01:04
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import Footer from './footer'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function BangumiList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elFooter = useMemo(() => <Footer />, [])

  return useObserver(() => {
    const styles = memoStyles()
    if (!$.userCollections._loaded) {
      return (
        <View style={styles.nestScrollLoading}>
          <Loading.Raw />
        </View>
      )
    }

    return (
      <ListView
        nestedScrollEnabled
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.nestScroll}
        sections={$.sections}
        showFooter={false}
        renderSectionHeader={renderSectionHeader}
        // @ts-ignore
        renderItem={renderItem}
        ListFooterComponent={elFooter}
      />
    )
  })
}

export default BangumiList
