/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:27:40
 */
import React from 'react'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Form from '../form'
import { styles } from './styles'
import { Ctx } from '../types'

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

export default obc(Create)
