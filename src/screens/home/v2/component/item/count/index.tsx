/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:34:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 15:11:34
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import CountBook from '../count-book'
import CountVideo from '../count-video'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Count({ subjectId, subject, epStatus, isFirst }: Props, { $ }: Ctx) {
  const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  if (label === '游戏') return null

  if (label === '书籍') {
    return (
      <View style={styles.count}>
        <CountBook subjectId={subjectId} isFirst={isFirst} />
      </View>
    )
  }

  return (
    <Touchable style={styles.count} onPress={() => $.itemToggleExpand(subjectId)}>
      <CountVideo epStatus={epStatus} subjectId={subjectId} subject={subject} />
      {isFirst && <Heatmap right={44} bottom={5} id='首页.展开或收起条目' />}
    </Touchable>
  )
}

export default obc(Count, COMPONENT)
