/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 17:38:45
 */
import React from 'react'
import { Flex, Image } from '@components'
import { useStore } from '@stores'
import { getCoverLarge, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'

function Cover() {
  const { $ } = useStore<Ctx>()
  if (!$.state.showCover) return null

  return (
    <Flex
      style={{
        minHeight: 96
      }}
      justify='center'
    >
      {!!$.icon && (
        <Image
          src={tinygrailOSS($.icon, 120)}
          size={104}
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
      )}
    </Flex>
  )
}

export default ob(Cover)
