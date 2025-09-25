/*
 * @Author: czy0729
 * @Date: 2024-01-05 17:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 06:10:03
 */
import React from 'react'
import { Flex, Loading as LoadingComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if ($.subjectComments._loaded) return null

    return (
      <Flex style={styles.loading} justify='center'>
        <LoadingComp />
      </Flex>
    )
  })
}

export default Loading
