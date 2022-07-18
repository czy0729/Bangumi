/*
 * @Author: czy0729
 * @Date: 2022-01-21 12:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:05:52
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Heatmap, SwitchPro, Flex, Text, Button } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import commonStyles from '../styles'
import { TEXTS } from './ds'
import { memoStyles } from './styles'

function Custom({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const styles = memoStyles()
    const { s2t, hideScore, cnFirst, heatMap, filterDefault, filter18x } =
      systemStore.setting
    return (
      <>
        {/* 定制 */}
        <ItemSetting hd='定制' arrow highlight onPress={setTrue} />

        <ActionSheet show={state} height={filter ? 400 : 680} onClose={setFalse}>
          {/* 优先中文 */}
          <ItemSettingBlock show={shows.cnFirst} style={_.mt.sm} {...TEXTS.cnFirst}>
            <ItemSettingBlock.Item
              title='开启'
              active={cnFirst}
              onPress={() => {
                if (cnFirst) return

                t('设置.切换', {
                  title: '优先中文',
                  checked: !cnFirst
                })

                systemStore.switchSetting('cnFirst')
              }}
            >
              <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
                例：看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  劇場版 魔法少女小圆
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='关闭'
              active={!cnFirst}
              onPress={() => {
                if (!cnFirst) return

                t('设置.切换', {
                  title: '优先中文',
                  checked: !cnFirst
                })

                systemStore.switchSetting('cnFirst')
              }}
            >
              <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
                例：看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  劇場版 魔法少女まどか☆マギカ
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='优先中文' />
          </ItemSettingBlock>

          {/* 章节讨论热力图 */}
          <ItemSettingBlock show={shows.heatMap} style={_.mt.sm} {...TEXTS.heatMap}>
            <ItemSettingBlock.Item
              title='开启'
              active={heatMap}
              onPress={() => {
                if (heatMap) return

                t('设置.切换', {
                  title: '章节讨论热力图',
                  checked: !heatMap
                })

                systemStore.switchSetting('heatMap')
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
              active={!heatMap}
              onPress={() => {
                if (!heatMap) return

                t('设置.切换', {
                  title: '章节讨论热力图',
                  checked: !heatMap
                })

                systemStore.switchSetting('heatMap')
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

          {/* 繁体 */}
          <ItemSetting
            show={shows.s2t}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={s2t}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '繁体',
                    checked: !s2t
                  })

                  systemStore.switchSetting('s2t')
                }}
              />
            }
            {...TEXTS.s2t}
          >
            <Heatmap id='设置.切换' title='繁体' />
          </ItemSetting>

          {/* 隐藏评分 */}
          <ItemSetting
            show={shows.hideScore}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={hideScore}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '隐藏评分',
                    checked: !hideScore
                  })

                  systemStore.switchSetting('hideScore')
                }}
              />
            }
            {...TEXTS.hideScore}
          >
            <Heatmap id='设置.切换' title='隐藏评分' />
          </ItemSetting>

          {/* 屏蔽无头像用户相关信息 */}
          <ItemSetting
            show={shows.filterDefault}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={filterDefault}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '屏蔽默认头像用户相关信息',
                    checked: !filterDefault
                  })

                  systemStore.switchSetting('filterDefault')
                }}
              />
            }
            {...TEXTS.filterDefault}
          >
            <Heatmap id='设置.切换' title='屏蔽默认头像用户相关信息' />
          </ItemSetting>

          {/* 屏蔽敏感内容 (NTFS) */}
          <ItemSetting
            show={shows.filter18x}
            hd='屏蔽敏感内容'
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={filter18x}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '屏蔽敏感内容',
                    checked: !filter18x
                  })

                  systemStore.switchSetting('filter18x')
                }}
              />
            }
            {...TEXTS.filter18x}
          >
            <Heatmap id='设置.切换' title='屏蔽敏感内容' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Custom
