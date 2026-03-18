/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:31:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, userStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

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

export default observer(IconWenku)
