/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:24:28
 */
import React, { useCallback, useState } from 'react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ScrollEvent } from '@types'
import Block from './block'
import More from './more'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT, YEARS_LEFT, YEARS_RIGHT } from './ds'
import { styles } from './styles'

function Award() {
  r(COMPONENT)

  const [scrolled, setScrolled] = useState(_.isPad)
  const onScroll = useCallback((evt: ScrollEvent) => {
    const { x } = evt.nativeEvent.contentOffset
    if (x >= 20) setScrolled(true)
  }, [])

  return useObserver(() => (
    <ScrollViewHorizontal
      contentContainerStyle={styles.container}
      onScroll={scrolled ? undefined : onScroll}
    >
      {YEARS_LEFT.map(year => (
        <Block key={year} year={year} />
      ))}
      {scrolled && (
        <>
          {YEARS_RIGHT.map(year => (
            <Block key={year} year={year} />
          ))}
          <More />
        </>
      )}
    </ScrollViewHorizontal>
  ))
}

export default Award
