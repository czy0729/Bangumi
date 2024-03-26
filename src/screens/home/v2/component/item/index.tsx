/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:48:04
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT, Props } from './ds'

function ItemWrap(
  { index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props,
  { $ }: Ctx
) {
  return (
    <Item
      index={index}
      title={title}
      subjectId={subjectId}
      type={subject.type}
      image={subject.images.medium}
      name={subject.name}
      name_cn={subject.name_cn}
      doing={subject.collection?.doing}
      time={subject.time}
      epStatus={Math.max(Number(epStatus) || 0, $.epStatus(subjectId))}
    />
  )
}

export default obc(ItemWrap, COMPONENT)
