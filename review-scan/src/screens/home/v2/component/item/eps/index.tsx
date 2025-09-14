/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 12:49:50
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Eps as EpsComp } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { window } from '@styles'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Eps({ subjectId, isFirst }: { subjectId: SubjectId; isFirst: boolean }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <View style={styles.eps}>
      <EpsComp
        layoutWidth={window.contentWidth}
        login={$.isLogin}
        subjectId={subjectId}
        eps={$.eps(subjectId)}
        userProgress={$.userProgress(subjectId)}
        flip={$.state.flip === subjectId}
        onFliped={$.afterEpsFlip}
        onSelect={(value, item: any) => $.doEpsSelect(value, item, subjectId, navigation)}
      />
      {isFirst && (
        <>
          <Heatmap right={72} id='首页.跳转' to='Topic' alias='章节讨论' transparent />
          <Heatmap bottom={35} id='首页.章节按钮长按' transparent />
          <Heatmap id='首页.章节菜单操作' />
        </>
      )}
    </View>
  )
}

export default ob(Eps, COMPONENT)
