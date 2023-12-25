/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:25:11
 */
import React, { useCallback, useState } from 'react'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { rerender } from '@utils/dev'
import { TEXT_ONLY } from '@constants'
import { ScrollEvent } from '@types'
import ScrollViewHorizontal from './scroll-view-horizontal'
import Block from './block'
import More from './more'
import { YEARS_LEFT, YEARS_RIGHT } from './ds'
import { styles } from './styles'

function Award() {
  rerender('Discovery.Award')

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
      {!TEXT_ONLY && scrolled && (
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
