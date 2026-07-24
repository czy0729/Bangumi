/*
 * @Author: czy0729
 * @Date: 2026-05-06 05:11:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:16:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import BlockItem from './block-item'

import type { Props } from './types'

function CollectionTimelines({ navigation, filter, setFalse }: Props) {
  return (
    <>
      <ItemSetting
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2026/png/386799/1778066374857-b8f74eac-0887-4565-9fb7-ddeb787d47e2.png',
          '0/2026/png/386799/1778066540506-fbfe3dff-57fa-485d-be32-efd248923327.png',
          '0/2026/png/386799/1778066482954-584755f5-d05f-4254-a2dd-9b68b91007f1.png',
          '0/2026/png/386799/1778066564495-baf9d25d-85f6-4d52-aa00-02e6a1e95406.png'
        ])}
        {...TEXTS.collectionTimelines}
      />
      <BlockItem navigation={navigation} setFalse={setFalse} />
    </>
  )
}

export default observer(CollectionTimelines)
