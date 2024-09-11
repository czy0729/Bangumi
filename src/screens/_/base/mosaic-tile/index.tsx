/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:11:14
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _ } from '@stores'
import { date, getTimestamp, info, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { getDates } from './utils'
import { COMPONENT } from './ds'
import { MARGIN, memoStyles, PX } from './styles'
import { Props as MosaicTileProps } from './types'

export { MosaicTileProps }

export const MosaicTile = ob(({ mosaicTile }: MosaicTileProps) => {
  if (!mosaicTile) return null

  const styles = memoStyles()
  const measureDays = {
    '01-25': 0,
    '02-22': 0,
    '03-25': 0,
    '04-24': 0,
    '05-25': 0,
    '06-24': 0,
    '07-25': 0,
    '08-25': 0,
    '09-24': 0,
    '10-25': 0,
    '11-24': 0,
    '12-25': 0
  }
  const days = getDates()
  days.forEach((item, index) => {
    const key = item.slice(5, item.length)
    if (key in measureDays && !measureDays[key]) {
      const m = parseInt(key.slice(0, 2))
      measureDays[m] = Math.floor(index / 7)
      delete measureDays[key]
    }
  })
  const months = new Array(12).fill(0).map((_item, index) => index + 1)
  const today = date('Y-m-d', getTimestamp())
  const colors = {
    1: _.select('#ffd8db', 'rgba(254, 138, 149, 0.32)'),
    2: _.select('#fe9da7', 'rgba(254, 138, 149, 0.48)'),
    3: _.select('#fe8a95', 'rgba(254, 138, 149, 0.64)'),
    4: _.select('#fe5060', 'rgba(254, 138, 149, 0.8)'),
    5: _.select('#fd293d', 'rgba(254, 138, 149, 1)')
  }
  return (
    <Flex style={styles.container} align='start'>
      <View style={styles.days}>
        <Text
          style={[
            styles.day,
            {
              top: PX + MARGIN
            }
          ]}
          size={10}
          type='sub'
        >
          日
        </Text>
        <Text
          style={[
            styles.day,
            {
              top: (PX + MARGIN) * 3
            }
          ]}
          size={10}
          type='sub'
        >
          二
        </Text>
        <Text
          style={[
            styles.day,
            {
              top: (PX + MARGIN) * 5
            }
          ]}
          size={10}
          type='sub'
        >
          四
        </Text>
        <Text
          style={[
            styles.day,
            {
              top: (PX + MARGIN) * 7
            }
          ]}
          size={10}
          type='sub'
        >
          六
        </Text>
      </View>
      <Flex.Item>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <View>
            <Flex style={styles.months}>
              {months.map(item => (
                <Text
                  key={String(item)}
                  style={[
                    styles.month,
                    {
                      left: (measureDays[item] || 0) * (PX + MARGIN) + 2
                    }
                  ]}
                  size={10}
                  type='sub'
                >
                  {item}月
                </Text>
              ))}
            </Flex>
            <Flex style={styles.items} direction='column' wrap='wrap'>
              {days.map(item => (
                <Touchable
                  key={String(item)}
                  style={stl(styles.item, item === today && styles.itemToday, {
                    backgroundColor:
                      colors[mosaicTile[item]] ||
                      (mosaicTile[item] ? colors[5] : _.select(_.colorBg, _._colorDarkModeLevel1))
                  })}
                  onPress={() => {
                    t('时间线.点击瓷砖', {
                      date: item,
                      value: mosaicTile[item] || 0
                    })

                    info(`${item}：${mosaicTile[item] || 0}`)
                  }}
                />
              ))}
            </Flex>
          </View>
        </ScrollView>
      </Flex.Item>
      <Heatmap id='时间线.点击瓷砖' />
    </Flex>
  )
}, COMPONENT)

export default MosaicTile
