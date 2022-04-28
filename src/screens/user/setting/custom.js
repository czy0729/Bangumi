/*
 * @Author: czy0729
 * @Date: 2022-01-21 12:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:57:16
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Heatmap, SwitchPro, Flex, Text, Button } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import commonStyles from './styles'

function Custom() {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const styles = memoStyles()
    const { s2t, hideScore, cnFirst, heatMap, filterDefault, filter18x } =
      systemStore.setting
    return (
      <>
        {/* 定制 */}
        <ItemSetting hd='定制' arrow highlight onPress={setTrue} />

        <ActionSheet show={state} height={640} onClose={setFalse}>
          {/* 优先中文 */}
          <ItemSettingBlock
            style={_.mt.sm}
            title='优先中文'
            information='条目名称会自动匹配中文名'
          >
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
          <ItemSettingBlock
            style={_.mt.sm}
            title='章节讨论热力图'
            information='章节按钮下方显示不同透明度的橙色条块, 可快速了解讨论激烈程度'
          >
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
            hd='繁体'
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
          >
            <Heatmap id='设置.切换' title='繁体' />
          </ItemSetting>

          {/* 隐藏评分 */}
          <ItemSetting
            hd='隐藏评分'
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
          >
            <Heatmap id='设置.切换' title='隐藏评分' />
          </ItemSetting>

          {/* 屏蔽无头像用户相关信息 */}
          <ItemSetting
            hd='屏蔽无头像用户相关信息'
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
          >
            <Heatmap id='设置.切换' title='屏蔽默认头像用户相关信息' />
          </ItemSetting>

          {/* 屏蔽敏感内容 */}
          <ItemSetting
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
            information='条目、小组、时间胶囊等，因网站规可能不返回数据，建议注册少于3个月的用户开启'
          >
            <Heatmap id='设置.切换' title='屏蔽敏感内容' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Custom

const memoStyles = _.memoStyles(() => ({
  bar: {
    height: 4,
    backgroundColor: _.colorWarning,
    borderRadius: 4
  },
  bar0: {
    opacity: 0
  },
  bar1: {
    opacity: 0.2
  },
  bar2: {
    opacity: 0.4
  },
  bar3: {
    opacity: 0.9
  }
}))
