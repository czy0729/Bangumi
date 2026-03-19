/*
 * @Author: czy0729
 * @Date: 2023-03-26 05:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:34:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { styles } from './styles'

function Content({ icon, size, type, collection, horizontal }) {
  if (horizontal) {
    return (
      <Flex style={[styles.content, styles.horizontal]}>
        <Iconfont name={icon} size={size - 1} color={_[`color${titleCase(type)}`]} />
        {!!collection && (
          <Text style={_.ml.xs} type={type} size={13} lineHeight={15} align='center'>
            {collection}
          </Text>
        )}
      </Flex>
    )
  }

  return (
    <View style={styles.content}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name={icon} size={size} color={_[`color${titleCase(type)}`]} />
      </Flex>
      {!!collection && (
        <Text style={styles.text} type={type} size={11} align='center'>
          {collection}
        </Text>
      )}
    </View>
  )
}

export default observer(Content)
