/*
 * @Author: czy0729
 * @Date: 2023-11-05 03:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 排行榜单个条目 (ItemSubject)
 */
import { observer } from 'mobx-react'
import { ItemSubject } from '@_'
import { useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ subjectId, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <ItemSubject
      navigation={navigation}
      event={EVENT}
      index={index}
      subjectId={subjectId}
      type={$.type}
      subject={$.subject(subjectId)}
      oss={$.subjectOSS(subjectId)}
      active={$.subjectId == subjectId}
    />
  )
}

export default observer(Item)
