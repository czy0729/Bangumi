/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:22
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import Item from '../../item'

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

export default ob(Lists)
