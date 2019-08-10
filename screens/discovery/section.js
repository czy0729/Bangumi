/*
 * @Author: czy0729
 * @Date: 2019-06-23 21:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-10 17:43:01
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Touchable } from '@components'
import { observer } from '@utils/decorators'
import { getCoverMedium } from '@utils/app'
import _ from '@styles'
import { sectionWidth, sectionHeight } from './store'

function Section(props, { $, navigation }) {
  let rankCover = ''
  if ($.rank._loaded) {
    rankCover = $.rank.list.length && $.rank.list[0].cover
  }

  let calendarCover = ''
  if ($.calendar._loaded) {
    // 今天星期几的数据排最前
    let day = new Date().getDay()
    if (day === 0) {
      day = 7
    }
    calendarCover = $.calendar.list.slice(day - 1)[0].items[0].images.large
  }

  return (
    <Flex style={styles.section}>
      <Touchable onPress={() => navigation.push('Rank')}>
        <View style={styles.image}>
          {!!rankCover && (
            <Image
              src={getCoverMedium(rankCover)}
              size={sectionWidth}
              height={sectionHeight}
              radius={_.radiusSm}
              quality={false}
            />
          )}
          <Flex style={styles.desc} justify='center'>
            <Text size={20} type='plain' bold>
              排行榜
            </Text>
          </Flex>
        </View>
      </Touchable>
      <Touchable onPress={() => navigation.push('Calendar')}>
        <View style={styles.image}>
          {!!calendarCover && (
            <Image
              src={getCoverMedium(calendarCover)}
              size={sectionWidth}
              height={sectionHeight}
              radius={_.radiusSm}
              quality={false}
            />
          )}
          <Flex style={styles.desc} justify='center'>
            <Text size={20} type='plain' bold>
              每日放送
            </Text>
          </Flex>
        </View>
      </Touchable>
    </Flex>
  )
}

Section.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Section)

const styles = StyleSheet.create({
  section: {
    marginTop: _.wind,
    marginHorizontal: _.wind
  },
  desc: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    backgroundColor: _.colorMask
  },
  image: {
    width: sectionWidth,
    height: sectionHeight,
    marginRight: _.wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
