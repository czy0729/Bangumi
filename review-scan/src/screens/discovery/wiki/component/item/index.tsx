/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:15:24
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, findSubjectCn } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ id, name, detail, userName, userId, time }) {
  const navigation = useNavigation()
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
        {!!time && (
          <Text style={_.ml.md} type='sub' size={12} lineHeight={15}>
            {time}
          </Text>
        )}
      </Flex>
      <Divider style={_.mt.sm} />
    </View>
  )
}

export default ob(Item, COMPONENT)
