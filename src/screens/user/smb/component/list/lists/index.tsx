/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:22
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Item from '../../item'

import type { Ctx } from '../../../types'

function Lists() {
  const { $ } = useStore<Ctx>()

  return (
    <>
      {$.pageList.map((item, index) => (
        <Item key={String(item?.name || index)} {...item} />
      ))}
    </>
  )
}

export default observer(Lists)
