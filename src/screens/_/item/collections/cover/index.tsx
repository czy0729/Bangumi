/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:30:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 14:36:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Cover as CoverComp } from '@components'

import { x18 } from '@utils'
import { InView } from '../../../base'
import { styles } from './styles'

function Cover({ index, subjectId, cover, y, type, onPress }) {
  return (
    <InView style={styles.inView} y={y}>
      <CoverComp
        src={cover}
        width={styles.inView.minWidth}
        height={styles.inView.minHeight}
        radius
        type={type}
        cdn={!x18(subjectId)}
        priority={index < 4 ? 'high' : 'normal'}
        onPress={onPress}
      />
    </InView>
  )
}

export default observer(Cover)
