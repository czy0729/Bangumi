/*
 * @Author: czy0729
 * @Date: 2024-03-11 18:21:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:12:23
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex } from '@components'
import { tinygrailStore, useStore } from '@stores'
import { confirm, formatNumber } from '@utils'
import { useObserver } from '@utils/hooks'
import { calculateRefineCost } from '@tinygrail/_/utils'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Action() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.myTemple.assets) return null

    return (
      <View>
        <Flex justify='center'>
          <Button
            style={styles.btnAsk}
            type='ask'
            radius={false}
            loading={$.state.loadingRefine}
            onPress={() => {
              if (tinygrailStore.checkAuth()) {
                if ($.state.loadingRefine) return

                if ($.state.confirmRefine) {
                  confirm('确定精炼?', () => $.doRefine(), '小圣杯助手')
                  return
                }

                $.doRefine()
              }
            }}
          >
            精炼 +{($.myTemple.refine || 0) + 1} (₵
            {formatNumber(calculateRefineCost($.myTemple.refine), 0)})
          </Button>
        </Flex>
      </View>
    )
  })
}

export default Action
