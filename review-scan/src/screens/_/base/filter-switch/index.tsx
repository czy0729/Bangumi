/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:27:09
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Component, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { setStorage, stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { getLastPath, scrollToX } from './utils'
import { COMPONENT, FILTER_SWITCH_DS, FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP, TOTAL } from './ds'
import { memoStyles } from './styles'
import { Props as FilterSwitchProps } from './types'

export { FilterSwitchProps, getLastPath }

/** 番剧, 游戏, 漫画, 文库, ADV, Hentai 页面直接切换筛选 */
export const FilterSwitch = ob(
  ({ title = '频道', name = FILTER_SWITCH_DS[0] }: FilterSwitchProps) => {
    const navigation = useNavigation()
    const styles = memoStyles()
    return (
      <Component id='base-filter-switch'>
        <Flex style={styles.row}>
          <View>
            <Text size={12} bold>
              {title}
            </Text>
          </View>
          <Flex.Item style={_.ml.md}>
            <ScrollView
              style={styles.contentContainerStyle}
              horizontal
              ref={scrollView => {
                scrollToX(scrollView, FILTER_SWITCH_DS, name)
              }}
              {...SCROLL_VIEW_RESET_PROPS}
            >
              {FILTER_SWITCH_DS.map(item => {
                const isActive = name === item
                return (
                  <Touchable
                    key={item}
                    style={stl(styles.item, isActive && styles.itemActive)}
                    onPress={
                      isActive
                        ? undefined
                        : () => {
                            setStorage(FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP[item])
                            navigation.replace(PATH_MAP[item])
                          }
                    }
                  >
                    <Text size={11} bold>
                      {item}
                      {!!TOTAL[item] && (
                        <Text type='sub' size={9} lineHeight={11} bold>{` ${TOTAL[item]}`}</Text>
                      )}
                    </Text>
                  </Touchable>
                )
              })}
            </ScrollView>
          </Flex.Item>
        </Flex>
      </Component>
    )
  },
  COMPONENT
)

export default FilterSwitch
