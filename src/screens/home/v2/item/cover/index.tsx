/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 16:40:15
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Touchable } from '@components'
import { InView, Cover as CompCover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_HEIGHT, IMG_WIDTH, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { styles } from './styles'

const ITEM_HEIGHT = 154

function Cover({ index, subjectId, subject }, { $, navigation }: Ctx) {
  const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  return (
    <View>
      <Touchable animate onPress={() => $.onItemPress(navigation, subjectId, subject)}>
        <InView style={styles.inView} y={ITEM_HEIGHT * index + _.headerHeight}>
          <CompCover
            src={subject?.images?.medium || ''}
            size={IMG_WIDTH}
            height={IMG_HEIGHT}
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

export default obc(Cover)
