/*
 * @Author: czy0729
 * @Date: 2020-07-09 16:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 08:22:28
 */
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Modal } from '@components'
import { timelineStore, useStore } from '@stores'
import { lastDate } from '@utils'
import { avatarHistory, avatarImageUrl } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { MODEL_TIMELINE_TYPE } from '@constants'
import Avatars from './avatars'
import Names from './names'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TimeLineType } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'
import type { NameState } from './names/types'

function UsedModal({ defaultAvatar, visible }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [name, setName] = useState<NameState>({
    list: [],
    _loaded: 0
  })
  const [avatar, setAvatar] = useState([
    {
      uri: defaultAvatar,
      time: '当前'
    }
  ])

  useEffect(() => {
    if (!visible || name._loaded) return

    checkUsedName()
    checkUserAvatar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const checkUsedName = async () => {
    const { id, username } = $.usersInfo
    const userId = username || id
    const data = {
      userId,
      type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('吐槽')
    }
    await timelineStore.fetchUsersTimeline(data, true)
    await timelineStore.fetchUsersTimeline(data)
    await timelineStore.fetchUsersTimeline(data)

    setName({
      list: timelineStore
        .usersTimeline(userId)
        .list.map(item => ({
          date: item.date,
          content: decoder(String(item?.reply?.content || ''))
        }))
        .filter(item => item.content.includes('改名为')),
      _loaded: 1
    })
  }

  const checkUserAvatar = async () => {
    const { id, username } = $.usersInfo
    const userId = username || id
    if (userId) {
      const data = await avatarHistory(userId)

      // 没有足够的数据, 不显示快照的
      if (!data) return

      setAvatar([
        {
          uri: defaultAvatar,
          time: '当前'
        },
        // 第一位是当前头像, 跳过避免与上面的重复
        ...data.history
          .slice(1)
          .filter(item => !!item.avatar_url)
          .map(item => ({
            uri: avatarImageUrl(item.avatar_url),
            time: item.captured_at ? lastDate(item.captured_at) : ''
          }))
      ])
    }
  }

  const styles = memoStyles()

  return (
    <Modal style={styles.modal} visible={visible} title='修改历史' onClose={$.closeUsedModal}>
      <View style={styles.content}>
        <Avatars avatar={avatar} />
        <Names name={name} />
      </View>
    </Modal>
  )
}

export default observer(UsedModal)
