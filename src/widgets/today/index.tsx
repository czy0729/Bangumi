/*
 * @Author: czy0729
 * @Date: 2023-05-23 11:59:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 20:51:09
 */
import React from 'react'
import {
  FlexWidget as Flex,
  ImageWidget as Image,
  TextWidget as Text
} from 'react-native-android-widget'
import { Title } from '../components'
import { styles } from './styles'

const WEEK_DAY_MAP = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
} as const

export default function Today({ day = 0, calendar = [] }: any) {
  const { length } = calendar
  return (
    <Flex style={styles.container}>
      <Title text={`每日放送 · ${WEEK_DAY_MAP[day]}`} />
      <Flex style={styles.list}>
        {!!length && (
          <Flex>
            {calendar.slice(0, 3).map(item => (
              <Item key={item.id} item={item} />
            ))}
          </Flex>
        )}
        {length >= 4 && (
          <Flex>
            {calendar.slice(3, 6).map(item => (
              <Item key={item.id} item={item} />
            ))}
          </Flex>
        )}
        <Flex style={styles.side} />
      </Flex>
    </Flex>
  )
}

function Item({ item }) {
  return (
    <Flex style={styles.item}>
      <Image
        image={item.images.large.replace(
          'http://lain.bgm.tv',
          'https://lain.bgm.tv/r/100x100'
        )}
        imageWidth={32}
        imageHeight={32}
        radius={6}
      />
      <Flex style={styles.body}>
        <Text
          style={styles.name}
          text={item.name_cn || item.name || '-'}
          maxLines={1}
        />
        <Text style={styles.time} text={getTime(item)} />
      </Flex>
    </Flex>
  )
}

function getTime(item: any = {}) {
  const { timeLocal = '', timeCN = '', timeJP = '' } = item
  const time = timeLocal || timeCN || timeJP || '2355'
  return `${time.slice(0, 2)}:${time.slice(2, 4)}`
}
