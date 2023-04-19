/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 12:36:53
 */
import React from 'react'
import { obc } from '@utils/decorators'
import Component from './in-view'

export const InView = obc((props, { $ }) => {
  return <Component {...props} visibleBottom={$?.state?.visibleBottom} />
})
