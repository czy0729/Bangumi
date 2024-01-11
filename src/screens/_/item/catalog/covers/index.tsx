/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:24:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { CATALOG_WIDTH, WIDTH } from '../ds'
import { Cover } from '../../../base'
import { memoStyles } from './styles'

function Covers({ list, total = 0 }) {
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
        {list
          .filter((item, index: number) => index < 3)
          .map(item => (
            <Cover key={item.id} size={WIDTH} src={item.image} placeholder={false} />
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
