/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:53:29
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Touchable } from '@components'
import { Cover as CompCover, InView } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_HEIGHT, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT, ITEM_HEIGHT, ITEM_HEIGHT_COMPACT } from './ds'
import { styles } from './styles'

function Cover({ index, subjectId, subject }, { $, navigation }: Ctx) {
  const { homeListCompact } = systemStore.setting
  const style = homeListCompact ? styles.inViewCompact : styles.inView
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  return (
    <View>
      <Touchable animate onPress={() => $.onItemPress(navigation, subjectId, subject)}>
        <InView
          style={style}
          y={(homeListCompact ? ITEM_HEIGHT_COMPACT : ITEM_HEIGHT) * index + _.headerHeight}
        >
          <CompCover
            src={subject?.images?.medium || ''}
            size={style.minWidth}
            height={homeListCompact ? style.minHeight : IMG_HEIGHT}
            radius
            shadow
            type={type}
          />
        </InView>
      </Touchable>
      {index === 0 && (
        <>
          <Heatmap bottom={68} id='首页.全部展开' transparent />
          <Heatmap bottom={34} id='首页.全部关闭' transparent />
          <Heatmap id='首页.跳转' to='Subject' alias='条目' />
        </>
      )}
    </View>
  )
}

export default obc(Cover, COMPONENT)
