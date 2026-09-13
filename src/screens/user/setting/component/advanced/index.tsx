/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:50:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconWrench } from '../icons'
import { getShows } from '../../utils'
import OpenInfo from './open-info'
import OriginSetting from './origin-setting'
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
        height={filter ? 360 : 480}
        onClose={setFalse}
      >
        {shows.origin && <OriginSetting filter={filter} setFalse={setFalse} />}
        {shows.webhook && <Webhook filter={filter} setFalse={setFalse} />}
        {shows.openInfo && <OpenInfo filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Advanced)
