/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:27:32
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ id, name, detail, userName, userId, time }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.item}>
      <Flex>
        <Flex.Item>
          <Touchable style={styles.touch} onPress={() => appNavigate(id, navigation)}>
            <Text type='main' lineHeight={15} bold>
              {findSubjectCn(name)}
            </Text>
          </Touchable>
          <Text
            style={_.mt.xs}
            onPress={() => {
              navigation.push('Zone', {
                userId
              })
            }}
          >
            {!!detail && (
              <Text type='sub' size={12} lineHeight={14}>
                {detail}{' '}
              </Text>
            )}
            {!!(userName || userId) && (
              <>
                <Text type='sub' size={12} lineHeight={14}>
                  by{' '}
                </Text>
                <Text size={12} lineHeight={14} bold>
                  {userName || userId}
                </Text>
              </>
            )}
          </Text>
        </Flex.Item>
        <Text type='sub' size={12}>
          {time}
        </Text>
      </Flex>
      <Divider style={_.mt.sm} />
    </View>
  )
}

export default obc(Item, COMPONENT)
