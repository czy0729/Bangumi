/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-16 16:08:47
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text, Divider } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate, findSubjectCn } from '@utils/app'

function Item({ id, name, detail, userName, userId }, { navigation }) {
  const styles = memoStyles()
  return (
    <View style={styles.item}>
      <Touchable
        style={styles.touch}
        onPress={() => appNavigate(id, navigation)}
      >
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
      <Divider style={_.mt.sm} />
    </View>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
