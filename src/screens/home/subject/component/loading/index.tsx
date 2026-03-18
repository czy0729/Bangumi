/*
 * @Author: czy0729
 * @Date: 2024-01-05 17:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:32:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading as LoadingComp } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Loading() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.subjectComments._loaded) return null

  return (
    <Flex style={styles.loading} justify='center'>
      <LoadingComp />
    </Flex>
  )
}

export default observer(Loading)
