/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Pagination } from '@components'
import { _, useStore } from '@stores'
import List from './list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ReplyList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <>
      <Flex.Item>{$.state.show && <List />}</Flex.Item>
      <Pagination
        style={_.mt.xs}
        input={$.state.ipt}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    </>
  )
}

export default observer(ReplyList)
