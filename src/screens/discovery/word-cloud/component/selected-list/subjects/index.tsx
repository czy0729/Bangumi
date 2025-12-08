/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:55:28
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { PaginationList2 } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { NUM_COLUMNS } from '../ds'
import { renderItem } from './utils'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Subjects() {
  const { $ } = useStore<Ctx>()

  const elPlaceholder = useMemo(() => <View />, [])

  return useObserver(() => {
    if (!$.selectedSubjects.length) return null

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        data={$.selectedSubjects}
        limit={20}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        removeClippedSubviews={false}
        footerEmptyDataComponent={elPlaceholder}
        footerNoMoreDataComponent={elPlaceholder}
        onScroll={$.onScroll}
      />
    )
  })
}

export default Subjects
