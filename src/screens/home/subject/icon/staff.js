/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 17:59:28
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconStaff(props, { $, navigation }) {
  const { showStaff } = systemStore.setting
  if (!showStaff) {
    return null
  }

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'Persons',
          from: '制作人员',
          subjectId: $.subjectId
        })

        navigation.push('Persons', {
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

export default obc(IconStaff)

const styles = _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
