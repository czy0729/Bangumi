/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-11 03:46:10
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Eps as EpsComp } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { window } from '@styles'
import { Ctx, EpsItem } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Eps({ subjectId, isFirst }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (value: string, item: EpsItem) => {
      $.doEpsSelect(value, item, subjectId, navigation)
    },
    [$, navigation, subjectId]
  )

  return useObserver(() => (
    <View style={styles.eps}>
      <EpsComp
        layoutWidth={window.contentWidth}
        login={$.isLogin}
        subjectId={subjectId}
        eps={$.eps(subjectId)}
        userProgress={$.userProgress(subjectId)}
        flip={$.state.flip === subjectId}
        onFliped={$.afterEpsFlip}
        onSelect={handleSelect}
      />
      {isFirst && (
        <>
          <Heatmap right={72} id='首页.跳转' to='Topic' alias='章节讨论' transparent />
          <Heatmap bottom={35} id='首页.章节按钮长按' transparent />
          <Heatmap id='首页.章节菜单操作' />
        </>
      )}
    </View>
  ))
}

export default Eps
