/*
 * @Author: czy0729
 * @Date: 2022-01-22 11:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 14:29:40
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { ActionSheet, Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

function Route() {
  const [show, setShow] = useState(false)
  const setTrue = useCallback(() => setShow(true), [])
  const setFalse = useCallback(() => setShow(false), [])
  const setHomeRenderTabs = useCallback(label => {
    if (label) {
      t('设置.切换', {
        title: '首页功能块',
        label
      })
      systemStore.setHomeRenderTabs(label)
    }
  }, [])
  const setInitialPage = useCallback(label => {
    if (label) {
      t('设置.切换', {
        title: '启动页',
        label
      })
      systemStore.setInitialPage(label)
    }
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const { homeRenderTabs, initialPage, tinygrail } = systemStore.setting
    const showDiscovery = homeRenderTabs.includes('Discovery')
    const showTimeline = homeRenderTabs.includes('Timeline')
    const showRakuen = homeRenderTabs.includes('Rakuen')
    return (
      <>
        <ItemSetting hd='底栏' arrow highlight onPress={setTrue} />
        <ActionSheet show={show} onClose={setFalse}>
          {/* 功能块 */}
          <View style={styles.blocks}>
            <Text type='title' size={16} bold>
              功能块
            </Text>
            <Text style={_.mt.sm} type='sub' size={12}>
              点击切换是否显示，切换后需要重新启动才能生效
            </Text>
            <Flex style={styles.tabs}>
              <Flex.Item>
                <Touchable onPress={() => setHomeRenderTabs('Discovery')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='home'
                        color={showDiscovery ? _.colorDesc : _.colorIcon}
                        size={18}
                      />
                    </View>
                    <Text type={showDiscovery ? undefined : 'icon'} size={11} bold>
                      发现
                    </Text>
                    {!showDiscovery && <View style={styles.disabledLine} />}
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setHomeRenderTabs('Timeline')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='md-access-time'
                        color={showTimeline ? _.colorDesc : _.colorIcon}
                        size={19}
                      />
                    </View>
                    <Text type={showTimeline ? undefined : 'icon'} size={11} bold>
                      时间胶囊
                    </Text>
                    {!showTimeline && <View style={styles.disabledLine} />}
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => info('进度暂不允许关闭')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        style={styles.iconStar}
                        name='md-star-outline'
                        color={_.colorDesc}
                        size={21}
                      />
                    </View>
                    <Text size={11} bold>
                      进度
                    </Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setHomeRenderTabs('Rakuen')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        style={_.mt.xxs}
                        name='md-chat-bubble-outline'
                        color={showRakuen ? _.colorDesc : _.colorIcon}
                        size={17}
                      />
                    </View>
                    <Text type={showRakuen ? undefined : 'icon'} size={11} bold>
                      超展开
                    </Text>
                    {!showRakuen && <View style={styles.disabledLine} />}
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => info('时光机暂不允许关闭')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='md-person-outline'
                        color={_.colorDesc}
                        size={21}
                      />
                    </View>
                    <Text size={11} bold>
                      时光机
                    </Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
            </Flex>
            <Heatmap id='设置.切换' title='首页功能块' />
          </View>

          {/* 启动页 */}
          <View style={styles.blocks}>
            <Text type='title' size={16} bold>
              启动页
            </Text>
            <Flex style={styles.tabs}>
              <Flex.Item>
                <Touchable onPress={() => setInitialPage('发现')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='home'
                        color={showDiscovery ? _.colorDesc : _.colorIcon}
                        size={18}
                      />
                    </View>
                    <Text type={showDiscovery ? undefined : 'icon'} size={11} bold>
                      发现
                    </Text>
                  </Flex>
                </Touchable>
                <Flex style={styles.activeBar} justify='center'>
                  {initialPage === 'Discovery' && <View style={styles.activeLine} />}
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setInitialPage('时间胶囊')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='md-access-time'
                        color={showTimeline ? _.colorDesc : _.colorIcon}
                        size={19}
                      />
                    </View>
                    <Text type={showTimeline ? undefined : 'icon'} size={11} bold>
                      时间胶囊
                    </Text>
                  </Flex>
                </Touchable>
                <Flex style={styles.activeBar} justify='center'>
                  {initialPage === 'Timeline' && <View style={styles.activeLine} />}
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setInitialPage('进度')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        style={styles.iconStar}
                        name='md-star-outline'
                        color={_.colorDesc}
                        size={21}
                      />
                    </View>
                    <Text size={11} bold>
                      进度
                    </Text>
                  </Flex>
                </Touchable>
                <Flex style={styles.activeBar} justify='center'>
                  {initialPage === 'Home' && <View style={styles.activeLine} />}
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setInitialPage('超展开')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        style={_.mt.xxs}
                        name='md-chat-bubble-outline'
                        color={showRakuen ? _.colorDesc : _.colorIcon}
                        size={17}
                      />
                    </View>
                    <Text type={showRakuen ? undefined : 'icon'} size={11} bold>
                      超展开
                    </Text>
                  </Flex>
                </Touchable>
                <Flex style={styles.activeBar} justify='center'>
                  {initialPage === 'Rakuen' && <View style={styles.activeLine} />}
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Touchable onPress={() => setInitialPage('时光机')}>
                  <Flex style={styles.tab} justify='center' direction='column'>
                    <View style={styles.icon}>
                      <Iconfont
                        name='md-person-outline'
                        color={_.colorDesc}
                        size={21}
                      />
                    </View>
                    <Text size={11} bold>
                      时光机
                    </Text>
                  </Flex>
                  <Flex style={styles.activeBar} justify='center'>
                    {initialPage === 'User' && <View style={styles.activeLine} />}
                  </Flex>
                </Touchable>
              </Flex.Item>
              {tinygrail && (
                <>
                  <View style={styles.split} />
                  <Flex.Item>
                    <Touchable onPress={() => setInitialPage('小圣杯')}>
                      <Flex style={styles.tab} justify='center' direction='column'>
                        <View style={styles.icon}>
                          <Iconfont
                            style={styles.iconTrophy}
                            name='trophy'
                            color={_.colorDesc}
                            size={16}
                          />
                        </View>
                        <Text size={11} bold>
                          小圣杯
                        </Text>
                      </Flex>
                      <Flex style={styles.activeBar} justify='center'>
                        {initialPage === 'Tinygrail' && (
                          <View style={styles.activeLine} />
                        )}
                      </Flex>
                    </Touchable>
                  </Flex.Item>
                </>
              )}
            </Flex>
            <Heatmap id='设置.切换' title='启动页' />
          </View>
        </ActionSheet>
      </>
    )
  })
}

export default Route

const memoStyles = _.memoStyles(() => ({
  blocks: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md - 2
  },
  tabs: {
    marginTop: _.md,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  tab: {
    paddingTop: _.sm + 2,
    paddingBottom: _.sm + 4,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  icon: {
    height: 24
  },
  iconStar: {
    marginTop: -1
  },
  iconTrophy: {
    marginTop: 3
  },
  disabledLine: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    bottom: 4,
    width: 5,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    transform: [
      {
        rotateZ: '45deg'
      }
    ]
  },
  split: {
    width: 1,
    height: 20,
    marginHorizontal: 2,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.64
  },
  activeBar: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0
  },
  activeLine: {
    width: 16,
    height: 4,
    backgroundColor: _.colorSuccess,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
