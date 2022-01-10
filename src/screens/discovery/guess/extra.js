/*
 * @Author: czy0729
 * @Date: 2022-01-09 13:43:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 13:53:44
 */
import React from 'react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import Type from './type'

let like

function Extra({ $ }) {
  // 缓存最近一次确定值
  if ($) like = $.state.like

  const currentLike = $?.state.like === undefined ? like : $?.state.like
  return (
    <>
      <Type
        key={currentLike === undefined}
        like={currentLike}
        onChange={$?.toggleLike}
      />
      <IconHeader
        style={_.mr._right}
        name='md-refresh'
        onPress={() => {
          t('推荐.刷新')
          if ($?.getList) $.getList()
        }}
      />
    </>
  )
}

export default ob(Extra)
