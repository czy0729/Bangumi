/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:52:24
 */
import React from 'react'
import { Button, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Form from '../form'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Create({ type, name, onScrollIntoViewIfNeeded }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { edit } = $.state
    const isCreate = edit.type === type && edit.item.id === '' && edit.item.uuid === ''
    if (isCreate) {
      return (
        <>
          <Text style={_.mt.md} size={15} bold>
            添加{name}源头
          </Text>
          <Form
            style={_.mt.md}
            name={edit.item.name}
            url={edit.item.url}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          />
        </>
      )
    }

    return (
      <Button
        style={styles.btn}
        type={_.select('ghostPlain', 'plain')}
        onPress={() =>
          $.openEdit(type, {
            id: '',
            uuid: '',
            name: '',
            url: '',
            sort: 0,
            active: 1
          })
        }
      >
        添加{name}源头
      </Button>
    )
  })
}

export default Create
