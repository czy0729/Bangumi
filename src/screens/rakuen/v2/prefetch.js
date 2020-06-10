/*
 * @Author: czy0729
 * @Date: 2019-10-20 20:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:16:23
 */
import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import { IconTabsHeader } from '@screens/_'
import { _ } from '@stores'

function Prefetch(props, { $ }) {
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
        <Flex>
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
      style={styles.icon}
      size={18}
      name='download'
      position='right'
      onPress={$.prefetchConfirm}
    />
  )
}

Prefetch.contextTypes = {
  $: PropTypes.object
}

export default observer(Prefetch)

const styles = StyleSheet.create({
  icon: {
    marginRight: -6,
    marginBottom: 0
  }
})
