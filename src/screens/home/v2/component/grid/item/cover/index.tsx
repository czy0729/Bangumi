/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:28:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:24:13
 */
import React from 'react'
import { Cover as CoverComp, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import { memoStyles } from '../styles'
import { COMPONENT } from './ds'

import type { SettingHomeGridCoverLayoutCn } from '@types'
import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Cover({ subjectId, subject, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const homeGridCoverLayoutCn =
      MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getLabel<SettingHomeGridCoverLayoutCn>(
        systemStore.setting.homeGridCoverLayout
      )

    return (
      <Touchable
        animate
        onPress={() => {
          $.selectGirdSubject(subjectId, {
            subject_id: subjectId,
            subject,
            ep_status: epStatus
          })
        }}
      >
        <CoverComp
          size={styles.item.width}
          height={styles.item.width * (homeGridCoverLayoutCn === '长方形' ? 1.4 : 1)}
          src={subject?.images?.medium || ''}
          radius
          delay={false}
        />
      </Touchable>
    )
  })
}

export default Cover
