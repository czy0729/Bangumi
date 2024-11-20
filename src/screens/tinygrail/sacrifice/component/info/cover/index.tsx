/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:14:51
 */
import React from 'react'
import { Flex, Image } from '@components'
import { useStore } from '@stores'
import { getCoverLarge, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'

function Cover() {
  const { $ } = useStore<Ctx>()
  if (!$.state.showCover || !$.icon) return null

  return (
    <Flex justify='center'>
      <Image
        src={tinygrailOSS($.icon, 120)}
        size={96}
        imageViewer
        imageViewerSrc={tinygrailOSS(getCoverLarge($.icon), 480)}
        skeletonType='tinygrail'
        event={{
          id: '资产重组.封面图查看',
          data: {
            monoId: $.monoId
          }
        }}
      />
    </Flex>
  )
}

export default ob(Cover)
