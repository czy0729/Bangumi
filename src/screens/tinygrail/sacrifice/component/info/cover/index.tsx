/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:27:42
 */
import React from 'react'
import { Flex, Image } from '@components'
import { getCoverLarge, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'

function Cover(props, { $ }: Ctx) {
  if (!$.state.showCover || !$.chara.icon) return null

  return (
    <Flex justify='center'>
      <Image
        src={tinygrailOSS(getCoverLarge($.chara.icon), 150)}
        autoSize={160}
        shadow
        imageViewer
        imageViewerSrc={tinygrailOSS(getCoverLarge($.chara.icon), 480)}
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
