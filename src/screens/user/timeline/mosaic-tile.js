/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:59:04
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Touchable, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { date, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'

const px = 12
const margin = 3

function MosaicTile(props, { $ }) {
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
      measureDays[m] = parseInt(index / 7)
      delete measureDays[key]
    }
  })
  const months = new Array(12).fill(0).map((item, index) => index + 1)
  const today = date('Y-m-d', getTimestamp())
  const colors = {
    1: _.select('#ffd8db', 'rgba(254, 138, 149, 0.32)'),
    2: _.select('#fe9da7', 'rgba(254, 138, 149, 0.48)'),
    3: _.select('#fe8a95', 'rgba(254, 138, 149, 0.64)'),
    4: _.select('#fe5060', 'rgba(254, 138, 149, 0.8)'),
    5: _.select('#fd293d', 'rgba(254, 138, 149, 1)')
  }
  return (
    <Flex style={styles.container}>
      <View style={styles.days}>
        <Text
          style={[
            styles.day,
            {
              top: px + margin
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
              top: (px + margin) * 3
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
              top: (px + margin) * 5
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
              top: (px + margin) * 7
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
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <Flex style={styles.months}>
              {months.map(item => (
                <Text
                  key={String(item)}
                  style={[
                    styles.month,
                    {
                      left: (measureDays[item] || 0) * (px + margin) + 2
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
                  style={[
                    styles.item,
                    item === today && styles.itemToday,
                    {
                      backgroundColor:
                        colors[$.mosaicTile[item]] ||
                        ($.mosaicTile[item]
                          ? colors[5]
                          : _.select(_.colorBg, _._colorDarkModeLevel1))
                    }
                  ]}
                  onPress={() => {
                    t('时间线.点击瓷砖', {
                      date: item,
                      value: $.mosaicTile[item] || 0
                    })

                    info(`${item}：${$.mosaicTile[item] || 0}`)
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
}

export default obc(MosaicTile)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm,
    paddingLeft: _.wind
  },
  months: {
    height: 16
  },
  month: {
    position: 'absolute',
    zIndex: 1,
    top: 0
  },
  days: {
    width: 16,
    height: '100%'
  },
  day: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  },
  contentContainerStyle: {
    paddingRight: _.wind
  },
  items: {
    minWidth: '100%',
    height: (px + margin) * 7,
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  },
  item: {
    width: px,
    height: px,
    marginRight: margin,
    marginTop: margin,
    borderRadius: _.radiusXs
  },
  itemToday: {
    borderWidth: 1,
    borderColor: _.colorTitle
  }
}))

function getDates(weeks = 52) {
  const stime =
    new Date() - (new Date().getDay() + weeks * 7) * 24 * 60 * 60 * 1000
  return new Array((weeks + 1) * 7)
    .fill(0)
    .map((_, i) =>
      date('Y-m-d', new Date(stime + i * 24 * 60 * 60 * 1000) / 1000)
    )
    .reverse()
}
