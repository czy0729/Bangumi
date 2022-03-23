/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-23 19:45:05
 */
import React from 'react'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Form from './form'

const Create = ({ type, name }, { $ }) => {
  const { edit } = $.state
  const isCreate = edit.type === type && edit.item.id === '' && edit.item.uuid === ''
  return isCreate ? (
    <>
      <Text style={_.mt.md} size={15} bold>
        添加{name}源头
      </Text>
      <Form
        style={_.mt.md}
        name={edit.item.name}
        url={edit.item.url}
        sort={edit.item.sort}
      />
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

const styles = _.create({
  btn: {
    marginVertical: _.md
  }
})
