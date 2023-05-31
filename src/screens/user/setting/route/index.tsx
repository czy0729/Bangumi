/*
 * @Author: czy0729
 * @Date: 2022-01-22 11:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 17:34:23
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import {
  ActionSheet,
  Touchable,
  Flex,
  Highlight,
  Text,
  Iconfont,
  Heatmap
} from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { info } from '@utils'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { STORYBOOK } from '@constants'
import { getShows } from '../utils'
import { TEXTS } from './ds'
import { memoStyles } from './styles'

function Route({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
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

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (STORYBOOK || !shows) return null

    const styles = memoStyles()
    const { homeRenderTabs, initialPage, tinygrail } = systemStore.setting
    const showDiscovery = homeRenderTabs.includes('Discovery')
    const showTimeline = homeRenderTabs.includes('Timeline')
    const showRakuen = homeRenderTabs.includes('Rakuen')
    return (
      <>
        <ItemSetting hd='底栏' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='底栏' onClose={setFalse}>
          {/* 功能块 */}
          {shows.blocks && (
            <View style={styles.blocks}>
              <Highlight type='title' size={16} bold value={filter}>
                {TEXTS.blocks.setting}
              </Highlight>
              <Text style={_.mt.sm} type='sub' size={12}>
                点击切换是否显示，切换后需要重新启动才能生效
              </Text>
              <Flex style={styles.tabs}>
                <Flex.Item>
                  <Touchable animate onPress={() => setHomeRenderTabs('Discovery')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='home'
                          color={showDiscovery ? _.colorDesc : _.colorIcon}
                          size={18}
                        />
                      </View>
                      <Highlight
                        type={showDiscovery ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.blocks.discovery}
                      </Highlight>
                      {!showDiscovery && <View style={styles.disabledLine} />}
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setHomeRenderTabs('Timeline')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='md-access-time'
                          color={showTimeline ? _.colorDesc : _.colorIcon}
                          size={19}
                        />
                      </View>
                      <Highlight
                        type={showTimeline ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.blocks.timeline}
                      </Highlight>
                      {!showTimeline && <View style={styles.disabledLine} />}
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => info('进度暂不允许关闭')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          style={styles.iconStar}
                          name='md-star-outline'
                          color={_.colorDesc}
                          size={21}
                        />
                      </View>
                      <Highlight size={11} bold value={filter}>
                        {TEXTS.blocks.home}
                      </Highlight>
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setHomeRenderTabs('Rakuen')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          style={_.mt.xxs}
                          name='md-chat-bubble-outline'
                          color={showRakuen ? _.colorDesc : _.colorIcon}
                          size={17}
                        />
                      </View>
                      <Highlight
                        type={showRakuen ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.blocks.rakuen}
                      </Highlight>
                      {!showRakuen && <View style={styles.disabledLine} />}
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => info('时光机暂不允许关闭')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='md-person-outline'
                          color={_.colorDesc}
                          size={21}
                        />
                      </View>
                      <Highlight size={11} bold value={filter}>
                        {TEXTS.blocks.user}
                      </Highlight>
                    </Flex>
                  </Touchable>
                </Flex.Item>
              </Flex>
              <Heatmap id='设置.切换' title='首页功能块' />
            </View>
          )}

          {/* 启动页 */}
          {shows.initialPage && (
            <View style={styles.blocks}>
              <Highlight type='title' size={16} bold value={filter}>
                {TEXTS.initialPage.setting}
              </Highlight>
              <Flex style={styles.tabs}>
                <Flex.Item>
                  <Touchable animate onPress={() => setInitialPage('发现')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='home'
                          color={showDiscovery ? _.colorDesc : _.colorIcon}
                          size={18}
                        />
                      </View>
                      <Highlight
                        type={showDiscovery ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.initialPage.discovery}
                      </Highlight>
                    </Flex>
                  </Touchable>
                  <Flex style={styles.activeBar} justify='center'>
                    {initialPage === 'Discovery' && <View style={styles.activeLine} />}
                  </Flex>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setInitialPage('时间胶囊')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='md-access-time'
                          color={showTimeline ? _.colorDesc : _.colorIcon}
                          size={19}
                        />
                      </View>
                      <Highlight
                        type={showTimeline ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.initialPage.timeline}
                      </Highlight>
                    </Flex>
                  </Touchable>
                  <Flex style={styles.activeBar} justify='center'>
                    {initialPage === 'Timeline' && <View style={styles.activeLine} />}
                  </Flex>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setInitialPage('进度')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          style={styles.iconStar}
                          name='md-star-outline'
                          color={_.colorDesc}
                          size={21}
                        />
                      </View>
                      <Highlight size={11} bold value={filter}>
                        {TEXTS.initialPage.home}
                      </Highlight>
                    </Flex>
                  </Touchable>
                  <Flex style={styles.activeBar} justify='center'>
                    {initialPage === 'Home' && <View style={styles.activeLine} />}
                  </Flex>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setInitialPage('超展开')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          style={_.mt.xxs}
                          name='md-chat-bubble-outline'
                          color={showRakuen ? _.colorDesc : _.colorIcon}
                          size={17}
                        />
                      </View>
                      <Highlight
                        type={showRakuen ? undefined : 'icon'}
                        size={11}
                        bold
                        value={filter}
                      >
                        {TEXTS.initialPage.rakuen}
                      </Highlight>
                    </Flex>
                  </Touchable>
                  <Flex style={styles.activeBar} justify='center'>
                    {initialPage === 'Rakuen' && <View style={styles.activeLine} />}
                  </Flex>
                </Flex.Item>
                <Flex.Item>
                  <Touchable animate onPress={() => setInitialPage('时光机')}>
                    <Flex style={styles.tab} justify='center' direction='column'>
                      <View style={styles.icon}>
                        <Iconfont
                          name='md-person-outline'
                          color={_.colorDesc}
                          size={21}
                        />
                      </View>
                      <Highlight size={11} bold value={filter}>
                        {TEXTS.initialPage.timeline}
                      </Highlight>
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
                      <Touchable animate onPress={() => setInitialPage('小圣杯')}>
                        <Flex style={styles.tab} justify='center' direction='column'>
                          <View style={styles.icon}>
                            <Iconfont
                              style={styles.iconTrophy}
                              name='trophy'
                              color={_.colorDesc}
                              size={16}
                            />
                          </View>
                          <Highlight size={11} bold value={filter}>
                            {TEXTS.initialPage.tinygrail}
                          </Highlight>
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
          )}
        </ActionSheet>
      </>
    )
  })
}

export default Route
