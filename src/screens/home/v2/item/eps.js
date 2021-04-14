/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 14:27:24
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Eps as CompEps } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { layoutWidth, itemPadding } from './ds'

function Eps({ index, subjectId }, { $, navigation }) {
  const { expand } = $.$Item(subjectId)
  if (!expand) {
    return null
  }

  return (
    <View style={styles.eps}>
      <CompEps
        layoutWidth={layoutWidth}
        marginRight={itemPadding}
        login={$.isLogin}
        subjectId={subjectId}
        eps={$.eps(subjectId)}
        userProgress={$.userProgress(subjectId)}
        onSelect={(value, item) =>
          $.doEpsSelect(value, item, subjectId, navigation)
        }
        onLongPress={item => $.doEpsLongPress(item, subjectId)}
      />
      {index === 1 && (
        <>
          <Heatmap
            right={72}
            id='首页.跳转'
            data={{
              to: 'Topic',
              alias: '章节讨论'
            }}
            transparent
          />
          <Heatmap bottom={35} id='首页.章节按钮长按' transparent />
          <Heatmap id='首页.章节菜单操作' />
        </>
      )}
    </View>
  )
}

export default obc(Eps)

const styles = _.create({
  eps: {
    marginTop: itemPadding
  }
})
