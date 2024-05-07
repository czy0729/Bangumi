/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:01:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Mesume, ScrollView, Text, Touchable } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { correctAgo, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { list, _loaded } = $.reviews
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume />
        <Text style={_.mt.sm} type='sub'>
          好像什么都没有
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {list.map(({ id, title, replies, time, avatar, userId, userName }, index) => (
        <Touchable
          key={id}
          style={styles.item}
          animate
          onPress={() => {
            navigation.push('Blog', {
              blogId: id
            })
          }}
        >
          <Flex style={styles.wrap} align='start'>
            <View style={_.mr.sm}>
              <Avatar navigation={navigation} userId={userId} name={userName} src={avatar} />
            </View>
            <Flex.Item>
              <Text size={15}>
                {HTMLDecode(title)}
                {replies !== '+0' && (
                  <Text type='main' size={12} lineHeight={15} bold>
                    {' '}
                    {replies}
                  </Text>
                )}
              </Text>
              <Text style={_.mt.xs} type='sub' size={12}>
                {correctAgo(time)} /{' '}
                <Text size={12} bold>
                  {userName}
                </Text>
              </Text>
              {!index && <Heatmap id='讨论版.跳转' />}
            </Flex.Item>
          </Flex>
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
