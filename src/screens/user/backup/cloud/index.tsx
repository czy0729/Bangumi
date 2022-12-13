/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-13 16:22:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const Cloud = (props, { $ }: Ctx) => {
  const { includeUrl, includeImage } = $.state
  return (
    <View style={styles.cloud}>
      <ItemSettingBlock style={styles.container} size={20}>
        <ItemSettingBlock.Item
          title='导出 CSV'
          information={`已获取 ${$.data.length} 个收藏`}
          onPress={$.onExport}
        />
        <ItemSettingBlock.Item
          style={_.ml.md}
          title='导入 CSV'
          information='开发中，预计 v7.6.0 实装'
          onPress={() => {}}
        />
      </ItemSettingBlock>
      <Flex style={_.mt.sm}>
        <Text size={12} bold>
          导出 CSV 列包含：
        </Text>
        <Touchable style={_.ml.sm} onPress={() => $.onSetting('includeUrl')}>
          <Flex>
            <Iconfont
              name={includeUrl ? 'md-check-circle-outline' : 'md-radio-button-off'}
              size={16}
              color={includeUrl ? _.colorDesc : _.colorSub}
            />
            <Text style={_.ml.xs} size={12} bold type={includeUrl ? 'desc' : 'sub'}>
              条目地址
            </Text>
          </Flex>
        </Touchable>
        <Touchable style={_.ml.md} onPress={() => $.onSetting('includeImage')}>
          <Flex>
            <Iconfont
              name={includeImage ? 'md-check-circle-outline' : 'md-radio-button-off'}
              size={16}
              color={includeImage ? _.colorDesc : _.colorSub}
            />
            <Text style={_.ml.xs} size={12} bold type={includeImage ? 'desc' : 'sub'}>
              封面地址
            </Text>
          </Flex>
        </Touchable>
      </Flex>
    </View>
  )
}

export default obc(Cloud)
