/*
 * @Author: czy0729
 * @Date: 2023-11-02 03:54:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 22:16:52
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { getSPAId } from '@utils'
import { scrollToTop } from '@utils/dom'
import { STORYBOOK } from '@constants'
import { Flex } from '../../flex'
import { Touchable } from '../../touchable'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { StorybookNavigation } from '../navigation'
import { BOTTOM_TAB_DS } from '../ds'
import { memoStyles } from './styles'

export const StorybookBottomTab = () => {
  if (!STORYBOOK) return null

  const params = new URLSearchParams(window.location.search)
  const currentStoryId = params.get('id')
  if (!BOTTOM_TAB_DS.some(item => currentStoryId === getSPAId(item.id))) return null

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <BlurView
        style={styles.bottomTab}
        tint={_.select('light', 'dark')}
        intensity={100}
      >
        <Flex>
          {BOTTOM_TAB_DS.map(item => {
            const storyId = getSPAId(item.id)
            const isActive = currentStoryId === storyId
            return (
              <Flex.Item key={item.id}>
                <Touchable
                  onPress={() => {
                    if (isActive) {
                      scrollToTop()
                      return
                    }

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
    )
  })
}
