/*
 * @Author: czy0729
 * @Date: 2022-01-09 13:43:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:40:17
 */
import React from 'react'
import { Flex } from '@components'
import { IconHeader } from '@_'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import Type from './type'

let like

function Extra({ $ }) {
  // 缓存最近一次确定值
  if ($) like = $.state.like

  const currentLike = $?.state.like === undefined ? like : $?.state.like
  return (
    <Flex>
      <Type
        key={currentLike === undefined}
        like={currentLike}
        onChange={$?.toggleLike}
      />
      <IconHeader
        name='md-refresh'
        onPress={() => {
          t('推荐.刷新')
          if ($?.getList) $.getList()
        }}
      />
    </Flex>
  )
}

export default ob(Extra)
