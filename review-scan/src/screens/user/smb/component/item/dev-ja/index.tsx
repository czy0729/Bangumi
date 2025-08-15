/*
 * @Author: czy0729
 * @Date: 2023-11-23 06:17:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 16:39:52
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { cleaned, cleaned2, cleaned3, cleaned4, cleaned5, findJA } from '@utils/thirdParty/ja'
import { extractAnimeName } from '../../../utils/directory'

function DevJA({ folderName }: { folderName: string }) {
  return null

  const ja = extractAnimeName(folderName)
  return (
    <>
      <Text type='main'>{ja}</Text>
      <Text type='warning'>- {cleaned(ja)}</Text>
      <Text type='warning'>- {cleaned2(ja)}</Text>
      <Text type='warning'>- {cleaned3(ja)}</Text>
      <Text type='warning'>- {cleaned4(ja)}</Text>
      <Text type='warning'>- {cleaned5(ja)}</Text>
      <Text type='primary'>{findJA(ja)}</Text>
    </>
  )
}

export default ob(DevJA)
