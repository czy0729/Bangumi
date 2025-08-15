/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:22:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 04:23:30
 */
import React from 'react'
import { ItemSetting } from '@_'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 同步收藏的帖子 */
function SyncTopic({ filter }) {
  return useObserver(() => <ItemSetting filter={filter} {...TEXTS.settingTopic} />)
}

export default SyncTopic
