/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:28:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:56
 */
import React from 'react'
import { Touchable } from '@components'
import { Cover as CompCover } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_HOME_GRID_COVER_LAYOUT } from '@constants'
import { SettingHomeGridCoverLayoutCn } from '@types'
import { Ctx } from '../../../types'
import { memoStyles } from '../styles'
import { COMPONENT } from './ds'

function Cover({ subjectId, subject, epStatus }, { $ }: Ctx) {
  const styles = memoStyles()
  const { homeGridCoverLayout } = systemStore.setting
  const homeGridCoverLayoutCn =
    MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getLabel<SettingHomeGridCoverLayoutCn>(homeGridCoverLayout)

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
      <CompCover
        size={styles.item.width}
        height={styles.item.width * (homeGridCoverLayoutCn === '长方形' ? 1.4 : 1)}
        src={subject?.images?.medium || ''}
        shadow
        radius
        delay={false}
      />
    </Touchable>
  )
}

export default obc(Cover, COMPONENT)
