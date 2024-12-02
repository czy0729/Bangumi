/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 18:17:08
 */
import React, { useCallback, useState } from 'react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ScrollEvent } from '@types'
import Award2023 from './award-2023'
import Block from './block'
import More from './more'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT, YEARS_LEFT } from './ds'
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
      <Award2023 />
      {YEARS_LEFT.map(year => (
        <Block key={year} year={year} />
      ))}
      {scrolled && <More />}
    </ScrollViewHorizontal>
  ))
}

export default Award
