/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-20 08:37:57
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
      style={$.homeOrigin ? styles.next : styles.btn}
      onPress={() => $.doWatchedNextEp(subjectId)}
    >
      <Flex justify='center'>
        <Iconfont
          style={styles.icon}
          name='md-check-circle-outline'
          size={19}
        />
        <View style={styles.placeholder}>
          <Text type='sub'>{sort}</Text>
        </View>
      </Flex>
      {index === 1 && <Heatmap right={26} id='首页.观看下一章节' />}
    </Touchable>
  )
}

export default obc(BtnEpNext)

const styles = _.create({
  btn: {
    paddingLeft: _.sm,
    paddingRight: _.sm + 2
  },
  next: {
    paddingLeft: _.sm,
    paddingRight: 2
  },
  icon: {
    marginTop: 2
  },
  placeholder: {
    marginBottom: -2,
    marginLeft: _.xs
  }
})
