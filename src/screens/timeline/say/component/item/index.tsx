/*
 * @Author: czy0729
 * @Date: 2023-06-17 11:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 19:07:48
 *
 * 吐槽对话条目
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { systemStore, tinygrailStore, usersStore, userStore, useStore } from '@stores'
import { confirm, getAvatarLocal } from '@utils'
import { API_AVATAR } from '@constants'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index, showName, isLast }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { id, name } = item

  /**
   * 必须放在 `if (!id) return null` 之前
   *  - 否则首次渲染会跳过 useCallback, 后续渲染再调用就会报
   *    Rendered more hooks than during the previous render
   * */
  const showTinygrailAt =
    systemStore.setting.tinygrail && systemStore.setting.avatarAlertTinygrailAssets
  const handleLongPress = useCallback(() => {
    if (showTinygrailAt) {
      confirm(
        '选择操作',
        () => $.at(id),
        '提示',
        () => tinygrailStore.alertUserAssets(id, name),
        '@TA',
        '资产'
      )
    } else {
      $.at(id)
    }
  }, [$, id, name, showTinygrailAt])

  if (!id) return null

  return (
    <>
      <ItemSay
        {...item}
        index={index}
        event={EVENT}
        position={id === userStore.myId ? 'right' : 'left'}
        avatar={
          usersStore.avatars(id) ||
          getAvatarLocal(id) ||
          (systemStore.setting.workerApiProxy ? '' : API_AVATAR(id))
        }
        showName={showName}
        onLongPress={handleLongPress}
      />
      {isLast && !!item.date && (
        <Text size={12} type='sub' align='center'>
          {item.date}
        </Text>
      )}
    </>
  )
}

export default observer(Item)
