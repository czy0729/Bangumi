/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 15:05:00
 */
import React from 'react'
import { View } from 'react-native'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { styles } from './styles'

const Cloud = (props, { $ }) => {
  return (
    <View style={_.container.wind}>
      <ItemSettingBlock style={styles.container} size={20}>
        <ItemSettingBlock.Item
          title='导出 CSV'
          information={`已获取 ${$.data.length} 个收藏`}
          onPress={() => {}}
        />
        <ItemSettingBlock.Item
          style={_.ml.md}
          title='导入 CSV'
          information='开发中，预计 v7.6.0 实装'
          onPress={() => {}}
        />
      </ItemSettingBlock>
    </View>
  )
}

export default obc(Cloud)
