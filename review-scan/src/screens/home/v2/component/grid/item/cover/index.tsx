/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:28:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:13:15
 */
import React from 'react'
import { Cover as CoverComp, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import { SettingHomeGridCoverLayoutCn } from '@types'
import { memoStyles } from '../styles'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'

function Cover({ subjectId, subject, epStatus }) {
  const { $ } = useStore<Ctx>()
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
}

export default ob(Cover, COMPONENT)
