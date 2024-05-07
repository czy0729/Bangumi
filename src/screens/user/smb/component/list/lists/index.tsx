/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 14:47:59
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import Item from '../../item'

function Lists(props, { $ }: Ctx) {
  return (
    <>
      {$.pageList.map((item, index) => (
        <Item key={String(item?.name || index)} {...item} />
      ))}
    </>
  )
}

export default obc(Lists)
