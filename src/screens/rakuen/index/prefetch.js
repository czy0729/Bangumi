/*
 * @Author: czy0729
 * @Date: 2019-10-20 20:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-06 17:36:36
 */
import React from 'react'
import { Alert } from 'react-native'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import { IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { IOS } from '@constants'

function Prefetch({ $ }) {
  const { prefetching, prefetchTotal, prefetchCurrent } = $.state
  if (prefetching) {
    return (
      <Touchable
        onPress={() => {
          Alert.alert('提示', '确定取消预读取?', [
            {
              text: '取消',
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: $.cancelPrefetch
            }
          ])
        }}
      >
        <Flex
          style={
            IOS
              ? {
                  marginBottom: _.tabsHeight
                }
              : {}
          }
        >
          <ActivityIndicator size='small' color={_.colorSub} />
          <Text style={_.ml.sm} type='sub' size={12}>
            {prefetchCurrent} / {prefetchTotal}
          </Text>
        </Flex>
      </Touchable>
    )
  }

  return (
    <IconTabsHeader
      style={{
        marginRight: -6
      }}
      size={18}
      name='download'
      position='right'
      onPress={$.prefetchConfirm}
    />
  )
}

export default observer(Prefetch)
