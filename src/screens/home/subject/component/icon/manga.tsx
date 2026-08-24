/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:31:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:12:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, userStore, useStore } from '@stores'
import { COMPONENT_MANGA } from './ds'
import styles from './styles'

import type { Ctx } from '../../types'

function IconManga() {
  const { $ } = useStore<Ctx>(COMPONENT_MANGA)

  if (userStore.isLimit || !$.source?.mangaId) return null

  return (
    <Touchable style={styles.icon} onPress={$.toManhuadb}>
      <Flex>
        <Iconfont name='md-visibility' />
        <Text style={_.ml.xs} size={13} type='sub'>
          漫画
        </Text>
      </Flex>
      <Heatmap id='条目.阅读漫画' />
    </Touchable>
  )
}

export default observer(IconManga)
