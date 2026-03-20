/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:28:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:27:32
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Cover as CoverComp, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import { memoStyles } from '../styles'
import { COMPONENT } from './ds'

import type { SettingHomeGridCoverLayoutCn } from '@types'
import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Cover({ subjectId, subject, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const homeGridCoverLayoutCn =
    MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getLabel<SettingHomeGridCoverLayoutCn>(
      systemStore.setting.homeGridCoverLayout
    )

  const handlePress = useCallback(() => {
    $.selectGirdSubject(subjectId, {
      subject_id: subjectId,
      subject,
      ep_status: epStatus
    })
  }, [$, epStatus, subject, subjectId])

  return (
    <Touchable animate onPress={handlePress}>
      <CoverComp
        size={styles.item.width}
        height={Math.floor(styles.item.width * (homeGridCoverLayoutCn === '长方形' ? 1.4 : 1))}
        src={subject?.images?.medium || ''}
        radius
        delay={false}
      />
    </Touchable>
  )
}

export default observer(Cover)
