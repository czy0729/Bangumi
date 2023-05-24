/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 12:19:47
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'

function Header() {
  return <CompHeader title='推荐' hm={['recommend', 'Recomment']} />
}

export default obc(Header)
