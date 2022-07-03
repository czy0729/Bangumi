/*
 * @Author: czy0729
 * @Date: 2019-10-20 20:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 15:53:47
 */
import React from 'react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, Text, Touchable } from '@components'
import { IconTabsHeader } from '@_'
import { obc } from '@utils/decorators'
import { confirm } from '@utils/ui'
import { _ } from '@stores'

function IconPrefetch(props, { $ }) {
  const { prefetching, prefetchTotal, prefetchCurrent } = $.state
  if (prefetching) {
    return (
      <Touchable
        onPress={() => {
          confirm('确定取消预读取?', $.cancelPrefetch)
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

export default obc(IconPrefetch)

const styles = _.create({
  icon: {
    marginRight: -6,
    marginBottom: 0
  }
})
