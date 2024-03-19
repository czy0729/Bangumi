/*
 * @Author: czy0729
 * @Date: 2024-03-19 19:17:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:50:39
 */
import React, { useState } from 'react'
import { Cover as CoverComp, Flex, Heatmap, Image } from '@components'
import { _ } from '@stores'
import { getCoverLarge } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Cover({ thumb, src, monoId }) {
  r(COMPONENT)
  const [loaded, setLoaded] = useState(false)

  return (
    <Flex style={_.mt.md} justify='center'>
      {!loaded && !!thumb && <CoverComp src={thumb} size={80} shadow />}
      {!!src && (
        <>
          <Image
            style={!loaded && styles.loading}
            src={getCoverLarge(src, 200)}
            autoSize={_.r(_.window.contentWidth * 0.5)}
            shadow
            imageViewer
            imageViewerSrc={getCoverLarge(src)}
            fallback
            event={{
              id: '人物.封面图查看',
              data: {
                monoId
              }
            }}
            onLoadEnd={() => {
              setLoaded(true)
            }}
          />
          <Heatmap id='人物.封面图查看' />
        </>
      )}
    </Flex>
  )
}

export default Cover
