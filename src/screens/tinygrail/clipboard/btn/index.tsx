/*
 * @Author: czy0729
 * @Date: 2020-11-30 20:28:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 17:35:13
 */
import React from 'react'
import { Flex, Button } from '@components'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Btn(props, { $ }: Ctx) {
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

export default obc(Btn)
