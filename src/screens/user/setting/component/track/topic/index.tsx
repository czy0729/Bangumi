/*
 * @Author: czy0729
 * @Date: 2026-05-06 05:11:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:18:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import BlockItem from './block-item'

import type { Props } from './types'

function Topic({ navigation, filter, setFalse }: Props) {
  return (
    <>
      <ItemSetting
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2026/png/386799/1778104894971-d05e8d5b-a3b0-4dcf-8b05-4de95062f053.png',
          '0/2026/png/386799/1778104903329-19a52453-9161-47ad-b411-7513116a2d0d.png',
          '0/2026/png/386799/1778104911993-e60a580f-66c1-4350-865c-2376dfbb8ab1.png'
        ])}
        {...TEXTS.topic}
      />
      <BlockItem navigation={navigation} setFalse={setFalse} />
    </>
  )
}

export default observer(Topic)
