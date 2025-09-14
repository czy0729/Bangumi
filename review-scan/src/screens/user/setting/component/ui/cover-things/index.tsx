/*
 * @Author: czy0729
 * @Date: 2024-04-20 19:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 21:31:04
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { height, TEXTS, URL_BOOK, URL_GAME, URL_MUSIC, width } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { memoStyles } from './styles'

/** 封面拟物 */
function CoverThings({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('coverThings')

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <ItemSettingBlock
        style={_.mt.sm}
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661071481482-cb9d38b1-1f09-4188-a13d-c10f5b6bbf75.png',
          '0/2022/png/386799/1661071487013-ae69bffd-7e68-40be-a3d7-2ded444e7d3c.png'
        ])}
        {...TEXTS.coverThings}
      >
        <ItemSettingBlock.Item
          itemStyle={styles.item}
          title='开启'
          active={value}
          filter={filter}
          onPress={() => {
            if (value) return

            handleSwitch()

            t('设置.切换', {
              title: '封面拟物',
              checked: !value
            })
          }}
        >
          <Flex style={_.mt.sm}>
            <View>
              <Cover type='书籍' useType size={width} height={height} src={URL_BOOK} radius />
            </View>
            <View style={_.ml.sm}>
              <Cover
                containerStyle={styles.gameContainer}
                bodyStyle={styles.gameBody}
                angleStyle={styles.gameAngle}
                type='游戏'
                useType
                size={width}
                height={height}
                src={URL_GAME}
                radius
              />
            </View>
            <View style={_.ml.sm}>
              <Cover
                angleStyle={styles.musicAngle}
                type='音乐'
                useType
                size={Math.floor(width * 1.2)}
                height={Math.floor(width * 1.2)}
                src={URL_MUSIC}
                radius
              />
            </View>
          </Flex>
        </ItemSettingBlock.Item>
        <ItemSettingBlock.Item
          style={_.ml.md}
          itemStyle={styles.item}
          title='关闭'
          active={!value}
          filter={filter}
          onPress={() => {
            if (!value) return

            handleSwitch()

            t('设置.切换', {
              title: '封面拟物',
              checked: !value
            })
          }}
        >
          <Flex style={_.mt.sm}>
            <View>
              <Cover size={width} height={height} src={URL_BOOK} radius />
            </View>
            <View style={_.ml.sm}>
              <Cover size={width} height={height} src={URL_GAME} radius />
            </View>
            <View style={_.ml.sm}>
              <Cover size={width} height={height} src={URL_MUSIC} radius />
            </View>
          </Flex>
        </ItemSettingBlock.Item>
        <Heatmap id='设置.切换' title='封面拟物' />
      </ItemSettingBlock>
    )
  })
}

export default CoverThings
