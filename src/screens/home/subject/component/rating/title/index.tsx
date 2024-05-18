/*
 * @Author: czy0729
 * @Date: 2021-08-12 15:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:19:06
 */
import React from 'react'
import { Text } from '@components'
import { Rank, SectionTitle } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RATING } from '../../../ds'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Title({ showScore }, { $, navigation }: Ctx) {
  const { showRating } = systemStore.setting
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
      onPress={() => $.onSwitchBlock('showRating')}
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

export default obc(Title, COMPONENT)
