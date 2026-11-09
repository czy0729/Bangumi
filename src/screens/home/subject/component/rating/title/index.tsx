/*
 * @Author: czy0729
 * @Date: 2021-08-12 15:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 评分板块标题, 点击可切换评分显示
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Rank } from '@_'
import { useStore } from '@stores'
import { TITLE_RATING } from '../../../ds'
import BlockTitle from '../../block-title'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Title({ showScore }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const showRating = $.showRating[0]

  return (
    <BlockTitle
      layoutKey='showRating'
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
    >
      {TITLE_RATING}{' '}
      {showScore && (
        <Text type='warning' size={18} lineHeight={18} bold>
          {$.rating.score}
        </Text>
      )}
    </BlockTitle>
  )
}

export default observer(Title)
