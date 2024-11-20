/*
 * @Author: czy0729
 * @Date: 2024-03-11 18:21:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:17:41
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex } from '@components'
import { useStore } from '@stores'
import { confirm, formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { calculateRefineCost } from '@tinygrail/_/utils'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Action() {
  const { $ } = useStore<Ctx>()
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
            if ($.state.loadingRefine) return

            if ($.state.confirmRefine) {
              confirm('确定精炼?', () => $.doRefine(), '小圣杯助手')
              return
            }

            $.doRefine()
          }}
        >
          精炼 +{($.myTemple.refine || 0) + 1} (₵
          {formatNumber(calculateRefineCost($.myTemple.refine), 0)})
        </Button>
      </Flex>
    </View>
  )
}

export default ob(Action)
