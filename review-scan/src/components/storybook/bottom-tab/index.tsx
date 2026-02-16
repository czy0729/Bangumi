/*
 * @Author: czy0729
 * @Date: 2023-11-02 03:54:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 16:16:07
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _, userStore } from '@stores'
import { getSPAId } from '@utils'
import { r } from '@utils/dev'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Component } from '../../component'
import { BOTTOM_TAB_DS, BOTTOM_TAB_WITH_AUTH_DS } from '../ds'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { StorybookNavigation } from '../navigation'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export const StorybookBottomTab = () => {
  r(COMPONENT)

  return useObserver(() => {
    if (!WEB) return null

    const params = new window.URLSearchParams(window.location.search)
    const currentStoryId = params.get('id')

    const DS = userStore.isStorybookLogin ? BOTTOM_TAB_WITH_AUTH_DS : BOTTOM_TAB_DS
    if (!DS.some(item => currentStoryId === getSPAId(item.id))) return null

    const styles = memoStyles()
    return (
      <Component id='component-storybook-bottom-tab' style={styles.bottomTab}>
        <BlurView
          style={styles.blurView}
          tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
          intensity={100}
        >
          <Flex>
            {DS.map((item: (typeof BOTTOM_TAB_WITH_AUTH_DS)[number]) => {
              const storyId = getSPAId(item.id)
              const isActive = currentStoryId === storyId
              return (
                <Flex.Item key={item.id}>
                  <Touchable
                    onPress={() => {
                      if (isActive) {
                        t('SPA.底部到顶', {
                          id: item.id
                        })

                        scrollToTop()
                        StorybookNavigation.emit({
                          type: `${EVENT_APP_TAB_PRESS}|${item.id}`
                        })
                        return
                      }

                      t('SPA.底部菜单', {
                        id: item.id
                      })

                      StorybookNavigation.replace(item.id, item.params)
                    }}
                  >
                    <Flex style={styles.item} direction='column'>
                      <Flex style={styles.icon}>
                        <Iconfont
                          name={item.icon}
                          size={item.size}
                          color={isActive ? _.colorMain : _.colorIcon}
                        />
                      </Flex>
                      <Text size={12} type={isActive ? 'main' : 'icon'}>
                        {item.label}
                      </Text>
                    </Flex>
                  </Touchable>
                </Flex.Item>
              )
            })}
          </Flex>
        </BlurView>
      </Component>
    )
  })
}
