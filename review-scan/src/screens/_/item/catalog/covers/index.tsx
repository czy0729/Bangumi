/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:28:36
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Text } from '@components'
import { x18 } from '@utils'
import { ob } from '@utils/decorators'
import { CATALOG_WIDTH, WIDTH } from '../ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Covers({ title = '', list, total = 0 }: Props) {
  const styles = memoStyles()
  return (
    <View style={styles.catalog}>
      <View
        style={[
          styles.catalogLine,
          styles.catalogLevel2,
          {
            width: CATALOG_WIDTH,
            height: CATALOG_WIDTH - 15
          }
        ]}
      />
      <View
        style={[
          styles.catalogLine,
          styles.catalogLevel1,
          {
            width: CATALOG_WIDTH,
            height: CATALOG_WIDTH - 7
          }
        ]}
      />
      <Flex style={styles.thumbs} align='start' wrap='wrap'>
        <View style={[styles.placeholder, styles.placeholderTopRight]} pointerEvents='none' />
        <View style={[styles.placeholder, styles.placeholderBottomLeft]} pointerEvents='none' />
        {list.map(item => (
          <Cover
            key={item.id}
            size={WIDTH}
            src={item.image}
            placeholder={false}
            cdn={!x18(item.id, title)}
          />
        ))}
        {!!list.length && (
          <Flex style={styles.num} justify='center' align='center'>
            <Text size={13} bold>
              +{total || list.length}
            </Text>
          </Flex>
        )}
      </Flex>
    </View>
  )
}

export default ob(Covers)
