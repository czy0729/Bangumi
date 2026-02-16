/*
 * @Author: czy0729
 * @Date: 2024-04-19 18:50:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:57
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { memoStyles } from './styles'

/** 章节讨论热力图 */
function HeatMap({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('heatMap')

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <ItemSettingBlock
        style={_.mt.sm}
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661129933349-1237edae-2c52-4724-bcb9-ff0ae77b3dfe.png',
          '0/2022/png/386799/1661129928244-485360af-e293-4573-ad60-680a5b5b9c38.png'
        ])}
        {...TEXTS.heatMap}
      >
        <ItemSettingBlock.Item
          title='开启'
          active={value}
          filter={filter}
          onPress={() => {
            if (value) return

            handleSwitch()

            t('设置.切换', {
              title: '章节讨论热力图',
              checked: !value
            })
          }}
        >
          <Flex style={_.mt.sm}>
            <View>
              <Button type='ghostPlain' size='sm'>
                1
              </Button>
              <View style={[styles.bar, styles.bar3]} />
            </View>
            <View style={_.ml.xs}>
              <Button type='ghostPlain' size='sm'>
                2
              </Button>
              <View style={[styles.bar, styles.bar2]} />
            </View>
            <View style={_.ml.xs}>
              <Button type='ghostPlain' size='sm'>
                3
              </Button>
              <View style={[styles.bar, styles.bar1]} />
            </View>
          </Flex>
        </ItemSettingBlock.Item>
        <ItemSettingBlock.Item
          style={_.ml.md}
          title='关闭'
          active={!value}
          filter={filter}
          onPress={() => {
            if (!value) return

            handleSwitch()

            t('设置.切换', {
              title: '章节讨论热力图',
              checked: !value
            })
          }}
        >
          <Flex style={_.mt.sm}>
            <View>
              <Button type='ghostPlain' size='sm'>
                1
              </Button>
              <View style={[styles.bar, styles.bar0]} />
            </View>
            <View style={_.ml.xs}>
              <Button type='ghostPlain' size='sm'>
                2
              </Button>
              <View style={[styles.bar, styles.bar0]} />
            </View>
            <View style={_.ml.xs}>
              <Button type='ghostPlain' size='sm'>
                3
              </Button>
              <View style={[styles.bar, styles.bar0]} />
            </View>
          </Flex>
        </ItemSettingBlock.Item>
        <Heatmap id='设置.切换' title='章节讨论热力图' />
      </ItemSettingBlock>
    )
  })
}

export default HeatMap
