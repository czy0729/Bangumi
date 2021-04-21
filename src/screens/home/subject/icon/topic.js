/*
 * @Author: czy0729
 * @Date: 2021-04-06 19:39:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 18:04:59
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconTopic(props, { $, navigation }) {
  const { showTopic } = systemStore.setting
  if (!showTopic) {
    return null
  }

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'Board',
          from: '帖子',
          subjectId: $.subjectId
        })

        navigation.push('Board', {
          subjectId: $.subjectId,
          name: $.cn
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default obc(IconTopic)

const styles = _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
