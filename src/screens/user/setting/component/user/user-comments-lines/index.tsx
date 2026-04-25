/*
 * @Author: czy0729
 * @Date: 2026-04-25 22:04:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 22:08:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { MODEL_USER_COMMENTS_LINES } from '@constants'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { DATA } from './ds'
import { styles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 评论默认展示行数 */
function UserCommentsLines({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('userCommentsLines')

  const { hd } = TEXTS.userCommentsLines

  return (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={DATA}
          selectedIndex={DATA.findIndex(item => item === MODEL_USER_COMMENTS_LINES.getLabel(value))}
          onValueChange={label => {
            handleSet(MODEL_USER_COMMENTS_LINES.getValue(label))

            t('设置.切换', {
              title: hd,
              label
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.userCommentsLines}
    >
      <Heatmap id='设置.切换' title={hd} />
    </ItemSetting>
  )
}

export default observer(UserCommentsLines)
