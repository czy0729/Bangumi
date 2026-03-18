/*
 * @Author: czy0729
 * @Date: 2021-08-12 15:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:33:20
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Rank, SectionTitle } from '@_'
import { systemStore, useStore } from '@stores'
import { TITLE_RATING } from '../../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Title({ showScore }: { showScore: boolean }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { showRating } = systemStore.setting

  const handleToggle = useCallback(() => $.onSwitchBlock('showRating'), [$])

  return (
    <SectionTitle
      left={
        showRating && (
          <Rank
            style={styles.rank}
            value={$.subject.rank || $.subjectFromOSS?.rating?.rank || '-'}
            size={13}
          />
        )
      }
      icon={!showRating && 'md-navigate-next'}
      splitStyles
      onPress={handleToggle}
    >
      {TITLE_RATING}{' '}
      {showScore && (
        <Text type='warning' size={18} lineHeight={18} bold>
          {$.rating.score}
        </Text>
      )}
    </SectionTitle>
  )
}

export default observer(Title)
