/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 10:00:00
 */
import { observer } from 'mobx-react'
import { _, userStore, useStore } from '@stores'
import Btn from './btn'
import { useMenuOnPress } from './hooks'
import { COMPONENT } from './ds'

import type { Props } from './types'
import type { Ctx } from '../../types'

function BtnWrap({ style, item }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { username, id } = userStore.userInfo
  const userId = username || id

  const { dragging } = $.state
  const { onPress } = useMenuOnPress(item)

  return (
    <Btn
      style={style}
      item={item}
      userId={userId}
      showIcon={!(dragging && _.isSmallDevice)}
      onPress={dragging ? undefined : onPress}
    />
  )
}

export default observer(BtnWrap)
