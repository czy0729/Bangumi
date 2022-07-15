/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 18:13:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function BtnEpNext({ subjectId, epStatus, isFirst }, { $ }: Ctx) {
  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  const countFixed = $.countFixed(subjectId, epStatus)
  return (
    <Touchable style={styles.touch} onPress={() => $.doWatchedNextEp(subjectId)}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={19} />
        <View style={styles.text}>
          <Text type='sub'>{Math.max(sort, countFixed + 1)}</Text>
        </View>
      </Flex>
      {isFirst && <Heatmap right={26} id='首页.观看下一章节' />}
    </Touchable>
  )
}

export default obc(BtnEpNext)

const styles = _.create({
  touch: {
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    height: 34,
    paddingHorizontal: _.device(_.sm, _.md)
  },
  next: {
    paddingLeft: _.sm,
    paddingRight: 2
  },
  icon: {
    marginTop: 2
  },
  text: {
    marginBottom: -2,
    marginLeft: _.xs
  }
})
