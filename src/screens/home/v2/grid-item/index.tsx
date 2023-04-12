/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:53:35
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { OnairProgress } from '@_'
import { _, systemStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Opacity from './opacity'
import Cover from './cover'
import { memoStyles } from './styles'
import { Props } from './types'

function GridItem({ subject = {}, subjectId = 0, epStatus }: Props, { $ }: Ctx) {
  // global.rerender('Home.GridItem')

  const styles = memoStyles()
  const { homeGridTitle } = systemStore.setting
  return (
    <View style={styles.item}>
      <Opacity subjectId={subjectId}>
        <Cover subjectId={subjectId} subject={subject} epStatus={epStatus} />
      </Opacity>
      <OnairProgress
        epStatus={epStatus}
        current={$.currentOnAir(subjectId)}
        total={$.epsCount(subjectId)}
      />
      {homeGridTitle && (
        <Text style={[_.mt.sm, _.mb.xs]} size={11} bold numberOfLines={2}>
          {cnjp(subject.name_cn, subject.name)}
        </Text>
      )}
    </View>
  )
}

export default obc(GridItem)
