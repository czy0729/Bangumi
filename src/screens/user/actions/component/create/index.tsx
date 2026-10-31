/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:03:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 新建入口与新建表单
 */
import { observer } from 'mobx-react'
import { Button, Text } from '@components'
import { _, useStore } from '@stores'
import Form from '../form'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Create() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.isCreating) {
    return (
      <>
        <Text style={_.mt.md} size={15} bold>
          添加
        </Text>
        <Form style={_.mt.md} />
      </>
    )
  }

  return (
    <Button style={styles.btn} type={_.select('ghostPlain', 'plain')} onPress={$.openCreate}>
      添加
    </Button>
  )
}

export default observer(Create)
