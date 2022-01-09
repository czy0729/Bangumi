/*
 * @Author: czy0729
 * @Date: 2022-01-08 07:39:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 07:52:14
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Type from './type'
import IconLayout from './icon-layout'

let type
let isList

function Extra({ $ }) {
  // 缓存最近一次确定值
  if ($) {
    isList = $.isList
    type = $.state.type
  }

  const currentType = $?.state.type === undefined ? type : $?.state.type
  return (
    <>
      <Type
        key={currentType === undefined}
        type={currentType}
        onChange={$?.toggleType}
      />
      <IconLayout
        isList={$?.isList === undefined ? isList : $?.isList}
        onPress={$?.switchLayout}
      />
    </>
  )
}

export default ob(Extra)
