/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:02:22
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import styles from './styles'

function IconWenku() {
  const { $ } = useStore<Ctx>()
  if (userStore.isLimit || !$.source?.wenkuId) return null

  return (
    <Touchable style={styles.icon} onPress={$.toWenku8}>
      <Flex>
        <Iconfont name='md-visibility' />
        <Text style={_.ml.xs} size={13} type='sub'>
          小说
        </Text>
      </Flex>
      <Heatmap id='条目.阅读轻小说' />
    </Touchable>
  )
}

export default ob(IconWenku)
