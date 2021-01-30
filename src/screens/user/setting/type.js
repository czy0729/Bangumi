/*
 * @Author: czy0729
 * @Date: 2020-01-05 20:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:22:05
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { systemStore, _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'

const typeDS = ['基本', '全部']

function Type() {
  const { simple } = systemStore.setting
  return (
    <View>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={typeDS}
        selectedIndex={simple ? 0 : 1}
        onValueChange={() => {
          t('设置.切换', {
            title: '简单模式',
            checked: !simple
          })

          systemStore.switchSetting('simple')
        }}
      />
      <Heatmap
        id='设置.切换'
        data={{
          title: '简单模式'
        }}
      />
    </View>
  )
}

export default ob(Type)

const styles = _.create({
  segment: {
    width: 80,
    height: 22
  }
})
