/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-08 00:48:54
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { OnairProgress } from '@_'
import { _, systemStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import Opacity from './opacity'
import Cover from './cover'
import { memoStyles } from './styles'
import { Props } from './types'
import { MODEL_SUBJECT_TYPE } from '@constants'

function GridItem({ subject = {}, subjectId = 0, epStatus }: Props, { $ }: Ctx) {
  // global.rerender('Home.GridItem')

  const styles = memoStyles()
  const { homeGridTitle } = systemStore.setting
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  return (
    <View style={styles.item}>
      <Opacity subjectId={subjectId}>
        <Cover subjectId={subjectId} subject={subject} epStatus={epStatus} />
      </Opacity>
      {typeCn !== '游戏' && (
        <OnairProgress
          epStatus={epStatus}
          current={$.currentOnAir(subjectId)}
          total={$.epsCount(subjectId)}
        />
      )}
      {homeGridTitle && (
        <Text style={[_.mt.sm, _.mb.xs]} size={11} bold numberOfLines={2}>
          {cnjp(subject.name_cn, subject.name)}
        </Text>
      )}
    </View>
  )
}

export default obc(GridItem)
