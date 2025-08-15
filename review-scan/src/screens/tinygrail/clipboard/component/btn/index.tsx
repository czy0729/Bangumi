/*
 * @Author: czy0729
 * @Date: 2020-11-30 20:28:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:26:04
 */
import React from 'react'
import { Button, Flex } from '@components'
import { useStore } from '@stores'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Btn() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const ids = $.list.list.filter(item => !!item.icoId).map(item => item.icoId)
  if (!ids.length) return null

  return (
    <Flex style={styles.wrap} justify='center'>
      <Button
        style={styles.btn}
        type='bid'
        onPress={() => {
          confirm(
            `对列表中 ${ids.length} 个ICO角色进行注资各5000, 确定?`,
            () => $.batchICO(ids),
            '小圣杯助手'
          )
        }}
      >
        一键注资
      </Button>
    </Flex>
  )
}

export default ob(Btn, COMPONENT)
