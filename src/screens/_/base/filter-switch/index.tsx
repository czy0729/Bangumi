/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:45:38
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { FLITER_SWITCH_LAST_PATH_KEY, FILTER_SWITCH_DS, PATH_MAP, TOTAL } from './ds'
import { memoStyles } from './styles'
import { Props as FilterSwitchProps } from './types'

export { FilterSwitchProps }

export async function getLastPath() {
  const path = await getStorage(FLITER_SWITCH_LAST_PATH_KEY)
  return path || PATH_MAP[FILTER_SWITCH_DS[0]]
}

export const FilterSwitch = obc(
  (
    { title = '频道', name = FILTER_SWITCH_DS[0] }: FilterSwitchProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    return (
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
                  style={[styles.item, isActive && styles.itemActive]}
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
                      <Text
                        type='sub'
                        size={9}
                        lineHeight={11}
                        bold
                      >{` ${TOTAL[item]}`}</Text>
                    )}
                  </Text>
                </Touchable>
              )
            })}
          </ScrollView>
        </Flex.Item>
      </Flex>
    )
  }
)

function scrollToX(
  scrollView: ScrollView,
  data: readonly any[],
  value: any,
  width = 50
) {
  try {
    if (scrollView && value) {
      const index = data.findIndex(i => i == value)
      if (index >= 5) {
        setTimeout(() => {
          scrollView.scrollTo(
            {
              x: (index - 2) * width,
              y: 0,
              animated: true
            },
            1
          )
        }, 80)
      }
    }
  } catch (error) {}
}
