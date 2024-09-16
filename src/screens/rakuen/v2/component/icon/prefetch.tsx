/*
 * @Author: czy0729
 * @Date: 2019-10-20 20:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 19:42:48
 */
import React from 'react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, Text, Touchable } from '@components'
import { IconTabsHeader } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconPrefetch(_props, { $ }: Ctx) {
  if ($.state.prefetching) {
    return (
      <Touchable
        onPress={() => {
          confirm('确定取消预读取?', $.cancelPrefetch)
        }}
      >
        <Flex>
          <ActivityIndicator size='small' color={_.colorSub} />
          <Text style={_.ml.sm} type='sub' size={12}>
            {$.state.prefetchCurrent} / {$.state.prefetchTotal}
          </Text>
        </Flex>
      </Touchable>
    )
  }

  return (
    <IconTabsHeader
      style={styles.icon}
      size={18}
      // @ts-expect-error
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
