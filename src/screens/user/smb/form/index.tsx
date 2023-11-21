/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 05:15:22
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Form from './form'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  const {
    visible,
    name,
    ip,
    username,
    password,
    port,
    sharedFolder,
    path,
    workGroup,
    url
  } = $.state
  return (
    <Form
      styles={memoStyles()}
      visible={visible}
      name={name}
      ip={ip}
      username={username}
      password={password}
      port={port}
      sharedFolder={sharedFolder}
      path={path}
      workGroup={workGroup}
      url={url}
      onClose={$.onClose}
    />
  )
})
