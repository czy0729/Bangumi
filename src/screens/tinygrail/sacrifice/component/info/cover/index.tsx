/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 12:08:55
 */
import React from 'react'
import { Flex, Image } from '@components'
import { getCoverLarge, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'

function Cover(props, { $ }: Ctx) {
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

export default obc(Cover)
