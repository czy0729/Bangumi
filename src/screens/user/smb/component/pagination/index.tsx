/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Pagination as PaginationComp } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Pagination() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <PaginationComp
      style={styles.pagination}
      inputStyle={styles.input}
      input={$.state._page}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPaginationInputChange}
      onSearch={$.onPaginationInputSubmit}
    />
  )
}

export default observer(Pagination)
