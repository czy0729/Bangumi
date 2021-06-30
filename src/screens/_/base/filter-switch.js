/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 09:03:43
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

export const filterSwitchDS = ['番剧', '漫画', '游戏', '文库', 'Hentai']
const pathDS = {
  番剧: 'Anime',
  漫画: 'Manga',
  游戏: 'Game',
  文库: 'Wenku',
  Hentai: 'Hentai'
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
          >
            {filterSwitchDS.map(item => (
              <Touchable
                key={item}
                style={[styles.item, name === item && styles.itemActive]}
                onPress={() => navigation.replace(pathDS[item])}
              >
                <Text size={11}>{item}</Text>
              </Touchable>
            ))}
          </ScrollView>
        </Flex.Item>
      </Flex>
    )
  }
)

const vertical = 4
const memoStyles = _.memoStyles(_ => ({
  row: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  multiple: {
    marginVertical: -vertical
  },
  multipleTitle: {
    marginTop: 8
  },
  contentContainerStyle: {
    paddingVertical: vertical
  },
  item: {
    paddingVertical: vertical,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  how: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: 34,
    marginBottom: -29
  }
}))
