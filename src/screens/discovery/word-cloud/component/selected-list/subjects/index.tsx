/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:55:28
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { EL_PLACEHOLDER, NUM_COLUMNS } from '../ds'
import { renderItem } from './utils'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Subjects() {
  const { $ } = useStore<Ctx>()

  if (!$.selectedSubjects.length) return null

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      data={$.selectedSubjects}
      limit={20}
      resetKey={`${$.state.title}|${$.state.subjectType}|${$.state.cutType}|${$.state.subCutType}|${$.state.year}`}
      numColumns={NUM_COLUMNS}
      renderItem={renderItem}
      removeClippedSubviews={false}
      footerEmptyDataComponent={EL_PLACEHOLDER}
      footerNoMoreDataComponent={EL_PLACEHOLDER}
      onScroll={$.onScroll}
    />
  )
}

export default observer(Subjects)
