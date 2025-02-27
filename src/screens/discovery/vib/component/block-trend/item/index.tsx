/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 09:55:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, uiStore } from '@stores'
import { feedback, findSubjectJp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Item({ navigation, item, index }: Props) {
  const jp = findSubjectJp(item.title, item.id)
  const up = item.value.includes('+')
  let value: string | number = Math.abs(Number(item.value))
  if (item.value.includes('.')) value = value.toFixed(2)
  return (
    <Flex style={styles.item} align='start'>
      <Text size={13} lineHeight={20}>
        {index + 1}.{' '}
      </Text>
      <Flex.Item>
        <Touchable
          style={_.ml.xs}
          onPress={() => {
            navigation.push('Subject', {
              subjectId: item.id,
              _cn: item.title
            })

            t('评分月刊.跳转', {
              subjectId: item.id
            })
          }}
        >
          <Text size={20}>{HTMLDecode(item.title)}</Text>
          {!!jp && jp !== item.title && (
            <Text style={_.mt.xs} type='sub' size={13} lineHeight={14}>
              {jp}
            </Text>
          )}
        </Touchable>
      </Flex.Item>
      <Touchable
        onPress={() => {
          uiStore.showPopableSubject({
            subjectId: item.id
          })
          feedback(true)

          t('评分月刊.缩略框', {
            subjectId: item.id
          })
        }}
      >
        <Flex style={styles.value} align='start'>
          <View style={up && styles.reverse}>
            <Text type={up ? 'bid' : 'ask'} size={28}>
              ▾
            </Text>
          </View>
          <Text size={16} lineHeight={30}>
            {' '}
            {value}
          </Text>
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default ob(Item, COMPONENT)
