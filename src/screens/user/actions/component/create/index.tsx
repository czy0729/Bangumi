/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:03:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-28 20:45:29
 */
import React from 'react'
import { Button, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Form from '../form'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Create() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { edit } = $.state
    if (edit.show && edit.uuid === '') {
      return (
        <>
          <Text style={_.mt.md} size={15} bold>
            添加
          </Text>
          <Form style={_.mt.md} name={edit.name} url={edit.url} />
        </>
      )
    }

    return (
      <Button
        style={styles.btn}
        type={_.select('ghostPlain', 'plain')}
        onPress={() => {
          $.openEdit({
            uuid: '',
            name: '',
            url: '',
            sort: '',
            active: 1
          })
        }}
      >
        添加
      </Button>
    )
  })
}

export default Create
