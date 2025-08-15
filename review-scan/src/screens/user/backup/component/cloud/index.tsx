/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:32:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { ItemSettingBlock } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COLOR_SUCCESS, COMPONENT } from './ds'
import { styles } from './styles'

const Cloud = () => {
  const { $ } = useStore<Ctx>()
  const { includeUrl, includeImage, upload } = $.state
  const { length } = Object.keys(upload)
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
          information={length ? `已导入 ${length} 个收藏` : '导入后进行同步操作'}
          onPress={$.onToggleUpload}
        />
      </ItemSettingBlock>
      <Flex style={_.mt.sm}>
        <Text size={12} bold>
          导出 CSV 列包含：
        </Text>
        <Touchable style={_.ml.sm} onPress={() => $.onSetting('includeUrl')}>
          <Flex>
            <Iconfont
              name={includeUrl ? 'md-check-circle' : 'md-radio-button-off'}
              size={16}
              color={includeUrl ? COLOR_SUCCESS : undefined}
            />
            <Text style={_.ml.xs} size={12} bold type={includeUrl ? 'desc' : 'sub'}>
              条目地址
            </Text>
          </Flex>
        </Touchable>
        <Touchable style={_.ml.md} onPress={() => $.onSetting('includeImage')}>
          <Flex>
            <Iconfont
              name={includeImage ? 'md-check-circle' : 'md-radio-button-off'}
              size={16}
              color={includeImage ? COLOR_SUCCESS : undefined}
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

export default ob(Cloud, COMPONENT)
