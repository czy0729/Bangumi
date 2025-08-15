/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:34:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:57:41
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import CountBook from '../count-book'
import CountVideo from '../count-video'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Count({
  subjectId,
  typeCn,
  epStatus,
  isFirst
}: {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  epStatus: string | number
  isFirst: boolean
}) {
  const { $ } = useStore<Ctx>()
  if (typeCn === '游戏') return null

  if (typeCn === '书籍') {
    return (
      <View style={styles.count}>
        <CountBook subjectId={subjectId} isFirst={isFirst} />
      </View>
    )
  }

  return (
    <Touchable style={styles.count} onPress={() => $.itemToggleExpand(subjectId)}>
      <CountVideo epStatus={epStatus} subjectId={subjectId} />
      {isFirst && <Heatmap right={44} bottom={5} id='首页.展开或收起条目' />}
    </Touchable>
  )
}

export default ob(Count, COMPONENT)
