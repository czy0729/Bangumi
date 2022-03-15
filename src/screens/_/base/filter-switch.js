/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 03:18:04
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
import { obc } from '@utils/decorators'

export const filterSwitchDS = ['番剧', '漫画', '游戏', '文库', 'Hentai']
const pathDS = {
  番剧: 'Anime',
  漫画: 'Manga',
  游戏: 'Game',
  文库: 'Wenku',
  Hentai: 'Hentai'
}

const FilterSwitchLastPathKey = '@screens|base|FilterSwitch'
export async function getLastPath() {
  const path = await getStorage(FilterSwitchLastPathKey)
  return path || pathDS[filterSwitchDS[0]]
}

export const FilterSwitch = obc(
  ({ title = '频道', name = filterSwitchDS[0] }, { navigation }) => {
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
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
          >
            {filterSwitchDS.map(item => {
              const isActive = name === item
              return (
                <Touchable
                  key={item}
                  style={[styles.item, isActive && styles.itemActive]}
                  onPress={
                    isActive
                      ? undefined
                      : () => {
                          setStorage(FilterSwitchLastPathKey, pathDS[item])
                          navigation.replace(pathDS[item])
                        }
                  }
                >
                  <Text size={11}>{item}</Text>
                </Touchable>
              )
            })}
          </ScrollView>
        </Flex.Item>
      </Flex>
    )
  }
)

const vertical = 4
const memoStyles = _.memoStyles(() => ({
  row: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  contentContainerStyle: {
    paddingVertical: vertical * _.ratio
  },
  item: {
    paddingVertical: vertical * _.ratio,
    paddingHorizontal: 12 * _.ratio,
    borderRadius: 12 * _.ratio,
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
