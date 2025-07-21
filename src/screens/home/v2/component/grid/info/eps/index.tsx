/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:33:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:20:49
 */
import React from 'react'
import { View } from 'react-native'
import { Eps as EpsComp } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { InferArray } from '@types'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Eps({ subjectId }) {
  const { $, navigation } = useStore<Ctx>()
  const eps = $.eps(subjectId)
  type Ep = InferArray<typeof eps>

  return (
    <View style={styles.eps}>
      <EpsComp
        grid
        numbersOfLine={$.numbersOfLineGrid(subjectId)}
        lines={$.linesGrid}
        login={$.isLogin}
        subjectId={subjectId}
        eps={eps}
        userProgress={$.userProgress(subjectId)}
        flip={$.state.flip === subjectId}
        onFliped={$.afterEpsFlip}
        onSelect={(value, item: Ep) => {
          $.doEpsSelect(value, item, subjectId, navigation)
        }}
      />
    </View>
  )
}

export default ob(Eps, COMPONENT)
