/*
 * @Author: czy0729
 * @Date: 2024-01-05 17:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:04:09
 */
import React from 'react'
import { Flex, Loading as LoadingComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading() {
  const { $ } = useStore<Ctx>()
  if ($.subjectComments._loaded) return null

  return (
    <Flex style={styles.loading} justify='center'>
      <LoadingComp />
    </Flex>
  )
}

export default ob(Loading, COMPONENT)
