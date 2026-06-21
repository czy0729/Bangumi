/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:10:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { PaginationList2 } from '@_'
import { useStore } from '@stores'
// import { TEXT_UPDATE_SPONSOR } from '@constants'
import { LIST } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

// import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  // const elListHeaderComponent = useMemo(
  //   () => (
  //     <Notice style={styles.notice}>
  //       截止至 {TEXT_UPDATE_SPONSOR} 共 {LIST.length} 人投食了，感谢你们的支持！
  //     </Notice>
  //   ),
  //   [styles]
  // )

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      data={LIST}
      numColumns={2}
      limit={40}
      // ListHeaderComponent={elListHeaderComponent}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
