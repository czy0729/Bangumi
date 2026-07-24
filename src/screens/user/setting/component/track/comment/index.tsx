/*
 * @Author: czy0729
 * @Date: 2026-05-04 15:15:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:17:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { SUBJECT_TYPE } from '@constants'
import { TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import BlockItem from './block-item'

import type { Props } from './types'

function Comment({ navigation, filter, setFalse }: Props) {
  return (
    <>
      <ItemSetting
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2026/png/386799/1777986537289-d53aae92-2164-48e1-8195-11a97e4162e8.png',
          '0/2026/png/386799/1777986644021-d711d22b-cf04-41d5-8ba4-410e6079c67e.png',
          '0/2026/png/386799/1777986650661-0986493b-3a7d-418d-9687-3fe876fda589.png'
        ])}
        {...TEXTS.comment}
      />
      {SUBJECT_TYPE.map(item => (
        <BlockItem key={item.label} navigation={navigation} item={item} setFalse={setFalse} />
      ))}
    </>
  )
}

export default observer(Comment)
