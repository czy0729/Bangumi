/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 06:03:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { Cover } from '../../../base'
import { WIDTH, CATALOG_WIDTH } from '../ds'
import { memoStyles } from './styles'

function Covers({ list }) {
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
      <Flex style={styles.thumbs} wrap='wrap'>
        {list
          .filter((item, index: number) => index < 3)
          .map(item => (
            <Cover key={item.id} size={WIDTH} src={item.image} placeholder={false} />
          ))}
        {!!list.length && (
          <Flex style={styles.num} justify='center' align='center'>
            <Text size={13} bold>
              +{list.length}
            </Text>
          </Flex>
        )}
      </Flex>
    </View>
  )
}

export default ob(Covers)
