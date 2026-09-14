/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconWrench } from '../icons'
import Timezone from '../timezone'
import { getShows } from '../../utils'
import OpenInfo from './open-info'
import Webhook from './webhook'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 高级 */
function Advanced({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconWrench />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.advanced}
      />
      <ActionSheet
        show={state}
        title={TEXTS.advanced.hd}
        height={filter ? 440 : 720}
        onClose={setFalse}
      >
        {shows.webhook && <Webhook filter={filter} setFalse={setFalse} />}
        {shows.openInfo && <OpenInfo filter={filter} />}

        {/* 时区内容较长 (说明 + 时区列表), 固定放面板最下方; 组件自行按 filter 判断是否渲染 */}
        <Timezone filter={filter} />
      </ActionSheet>
    </>
  )
}

export default observer(Advanced)
