/*
 * @Author: czy0729
 * @Date: 2020-12-26 15:38:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:58:07
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'

function Filter() {
  const { simple } = systemStore.setting
  return (
    <Touchable
      onPress={() => {
        t('设置.切换', {
          title: '简单模式',
          checked: !simple
        })

        systemStore.switchSetting('simple')

        info(simple ? '所有设置' : '常用设置')
      }}
    >
      <Flex>
        <Text size={13} type='sub'>
          {simple ? '基本' : '高级'}
        </Text>
        <Iconfont style={_.ml.xs} size={13} name='down' color={_.colorSub} />
      </Flex>
      <Heatmap
        id='设置.切换'
        data={{
          title: '简单模式'
        }}
      />
    </Touchable>
  )
}

export default ob(Filter)
