/*
 * @Author: czy0729
 * @Date: 2023-05-23 11:59:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 10:17:30
 */
import React from 'react'
import { ImageWidget as Image, TextWidget as Text } from 'react-native-android-widget'
import { Flex, Title } from '../components'
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
      <Flex row>
        <Flex.Item>
          <Title text='每日放送' />
        </Flex.Item>
        <Text text={WEEK_DAY_MAP[day]} />
      </Flex>
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
        imageWidth={28}
        imageHeight={28}
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
