/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:51:21
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemWrap({ index = 0, subjectId = 0, subject = {}, title, epStatus = '' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default ItemWrap
