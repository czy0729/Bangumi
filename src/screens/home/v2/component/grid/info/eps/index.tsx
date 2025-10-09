/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:33:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:22:53
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Eps as EpsComp } from '@_'
import { useStore } from '@stores'
import { Ep } from '@stores/subject/types'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Eps({ subjectId }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (value: string, item: Ep) => {
      $.doEpsSelect(value, item, subjectId, navigation)
    },
    [$, navigation, subjectId]
  )

  return useObserver(() => (
    <View style={styles.eps}>
      <EpsComp
        grid
        numbersOfLine={$.numbersOfLineGrid(subjectId)}
        lines={$.linesGrid}
        login={$.isLogin}
        subjectId={subjectId}
        eps={$.eps(subjectId)}
        userProgress={$.userProgress(subjectId)}
        flip={$.state.flip === subjectId}
        onFliped={$.afterEpsFlip}
        onSelect={handleSelect}
      />
    </View>
  ))
}

export default Eps
