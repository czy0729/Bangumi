/*
 * @Author: czy0729
 * @Date: 2024-01-05 17:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 17:49:31
 */
import React from 'react'
import { Flex, Loading as LoadingComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading(_props, { $ }: Ctx) {
  if ($.subjectComments._loaded) return null

  return (
    <Flex style={styles.loading} justify='center'>
      <LoadingComp />
    </Flex>
  )
}

export default obc(Loading, COMPONENT)
