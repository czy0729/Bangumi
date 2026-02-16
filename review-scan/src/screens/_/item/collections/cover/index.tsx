/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:30:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:29:16
 */
import React from 'react'
import { Cover as CoverComp } from '@components'
import { x18 } from '@utils'
import { ob } from '@utils/decorators'
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

export default ob(Cover)
