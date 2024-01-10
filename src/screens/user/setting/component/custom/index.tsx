/*
 * @Author: czy0729
 * @Date: 2022-01-21 12:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:32:28
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Button, Flex, Heatmap, SwitchPro, Text } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import commonStyles from '../../styles'
import { getShows, getYuqueThumbs } from '../../utils'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

function Custom({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const styles = memoStyles()
    const { s2t, hideScore, openInfo, cnFirst, heatMap, filterDefault, filter18x } =
      systemStore.setting
    return (
      <>
        {/* 定制 */}
        <ItemSetting hd='定制' arrow highlight filter={filter} onPress={setTrue} />

        <ActionSheet show={state} title='定制' height={filter ? 400 : 760} onClose={setFalse}>
          {/* 优先中文 */}
          <ItemSettingBlock
            show={shows.cnFirst}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661129866639-05608a0c-bc41-4065-b3c2-aa53bd63d327.png',
              '0/2022/png/386799/1661129870321-251db53c-5a80-4d99-a32b-a31749c40b27.png'
            ])}
            {...TEXTS.cnFirst}
          >
            <ItemSettingBlock.Item
              title='开启'
              active={cnFirst}
              filter={filter}
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
                看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  魔法少女小圆
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='关闭'
              active={!cnFirst}
              filter={filter}
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
                看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  魔法少女まどか☆マギカ
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='优先中文' />
          </ItemSettingBlock>

          {/* 章节讨论热力图 */}
          <ItemSettingBlock
            show={shows.heatMap}
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
              active={heatMap}
              filter={filter}
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
              filter={filter}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661132384882-626c4647-44c6-4462-8f6a-6faf757590c0.png',
              '0/2022/png/386799/1661132388033-f8d5e64b-be21-4712-9c87-e15f340e9b98.png'
            ])}
            {...TEXTS.s2t}
          >
            <Heatmap id='设置.切换' title='繁体' />
          </ItemSetting>

          {/* 打开外部浏览器前复制网址 */}
          <ItemSetting
            show={shows.openInfo}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={openInfo}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '复制网址',
                    checked: !openInfo
                  })

                  systemStore.switchSetting('openInfo')
                }}
              />
            }
            filter={filter}
            {...TEXTS.openInfo}
          >
            <Heatmap id='设置.切换' title='复制网址' />
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661132442436-448bd333-0fbc-4c7d-b411-044753cf9f47.png',
              '0/2022/png/386799/1661132444558-4965411c-4319-4050-b63c-98a28a28ddb2.png'
            ])}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661132417052-63f81f6b-30ab-4da7-a31f-3a6c927847d6.png',
              '0/2022/png/386799/1661132420774-00900fe7-99c8-4d8d-bdd7-a23a9f7fec07.png'
            ])}
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
            filter={filter}
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
