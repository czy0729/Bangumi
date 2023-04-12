/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:33:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 10:43:16
 */
import React from 'react'
import { View } from 'react-native'
import { Eps as CompEps } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { InferArray } from '@types'
import { Ctx } from '../../types'
import { styles } from './styles'

function Eps({ subjectId }, { $, navigation }: Ctx) {
  // global.rerender('Home.GridInfo.Eps')

  const { homeGridEpAutoAdjust } = systemStore.setting
  const { flip } = $.state
  const eps = $.eps(subjectId)
  type Ep = InferArray<typeof eps>

  return (
    <View style={styles.eps}>
      <CompEps
        grid
        numbersOfLine={
          _.isMobileLanscape
            ? 12
            : homeGridEpAutoAdjust
            ? _.device($.epsCount(subjectId, false) <= 18 ? 6 : 7, 8)
            : _.device(7, 8)
        }
        lines={_.isMobileLanscape ? 1 : 3}
        login={$.isLogin}
        subjectId={subjectId}
        eps={eps}
        userProgress={$.userProgress(subjectId)}
        flip={flip === subjectId}
        onFliped={$.afterFlipEps}
        onSelect={(value, item: Ep) => {
          $.doEpsSelect(value, item, subjectId, navigation)
        }}
      />
    </View>
  )
}

export default obc(Eps)
