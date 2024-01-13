/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 16:22:44
 */
import React from 'react'
import { Button, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Form from '../form'
import { COMPONENT } from './ds'
import { styles } from './styles'

const Create = ({ type, name }, { $ }: Ctx) => {
  const { edit } = $.state
  const isCreate = edit.type === type && edit.item.id === '' && edit.item.uuid === ''
  return isCreate ? (
    <>
      <Text style={_.mt.md} size={15} bold>
        添加{name}源头
      </Text>
      <Form style={_.mt.md} name={edit.item.name} url={edit.item.url} />
    </>
  ) : (
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
}

export default obc(Create, COMPONENT)
