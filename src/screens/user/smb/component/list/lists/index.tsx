/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:08:48
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import Item from '../../item'

function Lists(_props, { $ }: Ctx) {
  return (
    <>
      {$.pageList.map((item, index) => (
        <Item key={String(item?.name || index)} {...item} />
      ))}
    </>
  )
}

export default obc(Lists)
