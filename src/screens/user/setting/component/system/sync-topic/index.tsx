/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:22:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:31:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 同步收藏的帖子 */
function SyncTopic({ filter }: WithFilterProps) {
  return <ItemSetting filter={filter} {...TEXTS.settingTopic} />
}

export default observer(SyncTopic)
