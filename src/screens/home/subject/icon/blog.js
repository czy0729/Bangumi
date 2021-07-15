/*
 * @Author: czy0729
 * @Date: 2021-07-15 19:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-15 19:17:07
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconBlog(props, { $, navigation }) {
  const { showBlog } = systemStore.setting
  if (!showBlog) {
    return null
  }

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'Reviews',
          from: '日志',
          subjectId: $.subjectId
        })

        navigation.push('Reviews', {
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

export default obc(IconBlog)

const styles = _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
