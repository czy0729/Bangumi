/*
 * @Author: czy0729
 * @Date: 2024-03-19 19:17:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:50:39
 */
import React, { useCallback, useMemo, useState } from 'react'
import { Cover as CoverComp, Flex, Heatmap, Image } from '@components'
import { _ } from '@stores'
import { getCoverLarge } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Cover({ thumb, src, monoId }) {
  r(COMPONENT)

  const [loaded, setLoaded] = useState(false)
  const event = useMemo(
    () =>
      ({
        id: '人物.封面图查看',
        data: {
          monoId
        }
      } as const),
    [monoId]
  )
  const handleLoadEnd = useCallback(() => {
    setLoaded(true)
  }, [setLoaded])

  return (
    <Flex style={styles.cover} justify='center'>
      {!!thumb && !loaded && <CoverComp src={thumb} size={80} shadow />}
      {!!src && (
        <>
          <Image
            style={!loaded && styles.loading}
            src={getCoverLarge(src, 200)}
            autoSize={_.r(_.window.contentWidth * 0.52)}
            imageViewer
            imageViewerSrc={getCoverLarge(src)}
            fallback
            event={event}
            onLoadEnd={handleLoadEnd}
          />
          <Heatmap id='人物.封面图查看' />
        </>
      )}
    </Flex>
  )
}

export default Cover
