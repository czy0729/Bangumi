/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:03:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 13:46:23
 */
import React from 'react'
import { Button, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Form from '../form'
import { COMPONENT } from './ds'
import { styles } from './styles'

const Create = (props, { $ }: Ctx) => {
  const { edit } = $.state
  const isCreate = edit.show && edit.uuid === ''
  return isCreate ? (
    <>
      <Text style={_.mt.md} size={15} bold>
        添加
      </Text>
      <Form style={_.mt.md} name={edit.name} url={edit.url} />
    </>
  ) : (
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
}

export default obc(Create, COMPONENT)
