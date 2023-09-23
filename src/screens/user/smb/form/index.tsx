/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 08:51:44
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Form from './form'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  const {
    visible,
    id,
    name,
    ip,
    username,
    password,
    port,
    sharedFolder,
    path,
    workGroup,
    url,
    webDAV
  } = $.state
  return (
    <Form
      styles={memoStyles()}
      visible={visible}
      id={id}
      name={name}
      ip={ip}
      username={username}
      password={password}
      port={port}
      sharedFolder={sharedFolder}
      path={path}
      workGroup={workGroup}
      url={url}
      webDAV={webDAV}
      onChange={$.onChange}
      onClose={$.onClose}
      onSubmit={$.onSubmit}
    />
  )
})
