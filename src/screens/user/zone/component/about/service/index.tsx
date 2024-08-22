/*
 * @Author: czy0729
 * @Date: 2024-04-09 08:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:34:31
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text } from '@components'
import { open, stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Service(_props, { $ }: Ctx) {
  const { networkService } = $.users
  if (!networkService?.length) return null

  return (
    <>
      <Flex style={styles.service} wrap='wrap'>
        {networkService.map(item => (
          <Flex key={item.label} style={styles.item}>
            <View
              style={stl(
                styles.badge,
                item.color && {
                  backgroundColor: item.color
                }
              )}
            >
              <Text size={10} type='__plain__' bold shadow>
                {item.label}
              </Text>
            </View>
            <Text
              size={11}
              bold
              onPress={
                item.href
                  ? () => {
                      open(item.href)
                    }
                  : undefined
              }
            >
              {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Divider />
    </>
  )
}

export default obc(Service, COMPONENT)
