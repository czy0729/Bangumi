/*
 * @Author: czy0729
 * @Date: 2019-10-20 20:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:55:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, Text, Touchable } from '@components'
import { IconTabsHeader } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconPrefetch() {
  const { $ } = useStore<Ctx>()

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
      style={styles.prefetch}
      size={18}
      // @ts-expect-error
      name='download'
      position='right'
      onPress={$.prefetchConfirm}
    />
  )
}

export default observer(IconPrefetch)
