/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:41:25
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Divider } from '@components'
import { Cover } from '@_'
import { userStore, _ } from '@stores'
import { appNavigate, findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { API_COVER, IMG_WIDTH_SM, IMG_HEIGHT_SM } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ id, name, detail, userName, userId }, { navigation }: Ctx) {
  const styles = memoStyles()
  const subjectId = String(id).includes('/subject/')
    ? String(id).replace('/subject/', '')
    : 0
  return (
    <View style={styles.item}>
      <Flex align='start'>
        {!!subjectId && (
          <Cover
            style={_.mr.md}
            size={IMG_WIDTH_SM}
            height={IMG_HEIGHT_SM}
            src={API_COVER(subjectId)}
            radius
            headers={userStore.requestHeaders}
          />
        )}
        <Flex.Item>
          <Touchable style={styles.touch} onPress={() => appNavigate(id, navigation)}>
            <Text type='main' lineHeight={15} bold>
              {findSubjectCn(name)}
            </Text>
          </Touchable>
          <Text
            style={_.mt.xs}
            onPress={() =>
              navigation.push('Zone', {
                userId
              })
            }
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
      </Flex>
      <Divider style={_.mt.sm} />
    </View>
  )
}

export default obc(Item)
