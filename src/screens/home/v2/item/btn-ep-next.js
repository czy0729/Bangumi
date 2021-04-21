/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 17:06:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnEpNext({ index, subjectId }, { $ }) {
  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) {
    return null
  }

  return (
    <Touchable
      // style={$.homeOrigin ? styles.next : styles.btn}
      style={styles.touch}
      onPress={() => $.doWatchedNextEp(subjectId)}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          style={styles.icon}
          name='md-check-circle-outline'
          size={19}
        />
        <View style={styles.text}>
          <Text type='sub'>{sort}</Text>
        </View>
      </Flex>
      {index === 1 && <Heatmap right={26} id='首页.观看下一章节' />}
    </Touchable>
  )
}

export default obc(BtnEpNext)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    height: 34,
    paddingHorizontal: _.sm
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
