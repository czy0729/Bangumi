/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:35:41
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Pagination(props, { $ }: Ctx) {
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

export default obc(Pagination, COMPONENT)
