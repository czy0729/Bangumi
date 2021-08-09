/*
 * @Author: czy0729
 * @Date: 2021-08-08 06:10:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:42:59
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Main from './index.main'

export const Eps = ob(props => <Main {...props} isPad={_.isPad} sm={_.sm} />)
