/*
 * @Author: czy0729
 * @Date: 2023-11-02 03:54:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:30:58
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { getSPAId } from '@utils'
import { r } from '@utils/dev'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { STORYBOOK } from '@constants'
import { Component } from '../../component'
import { BOTTOM_TAB_DS } from '../ds'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { StorybookNavigation } from '../navigation'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export const StorybookBottomTab = () => {
  r(COMPONENT)

  if (!STORYBOOK) return null

  const params = new URLSearchParams(window.location.search)
  const currentStoryId = params.get('id')
  if (!BOTTOM_TAB_DS.some(item => currentStoryId === getSPAId(item.id))) return null

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='component-storybook-bottom-tab' style={styles.bottomTab}>
        <BlurView style={styles.blurView} tint={_.select('light', 'dark')} intensity={100}>
          <Flex>
            {BOTTOM_TAB_DS.map(item => {
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
