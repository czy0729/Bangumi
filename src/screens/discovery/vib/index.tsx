/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:42:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 22:23:46
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { TapListener } from '@_'
import { _, uiStore } from '@stores'
import BlockNew from './component/block-new'
import BlockTrend from './component/block-trend'
import Pagination from './component/pagination'
import Title from './component/title'
import Header from './header'
import { initBangumiData } from './utils'
import { DATA } from './ds'
import { memoStyles } from './styles'
import { Data, Props } from './types'

const VIB = ({ navigation }: Props) => {
  const scrollTo = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [index, setIndex] = useState(0)
  const handleSelect = useCallback(
    (index: number) => {
      setIndex(index)
      setTimeout(() => {
        if (typeof scrollTo.current === 'function') {
          scrollTo.current({
            x: 0,
            y: 0,
            animated: true,
            duration: 640
          })
        }
      }, 40)
    },
    [setIndex]
  )

  useEffect(() => {
    initBangumiData(() => {
      setLoaded(true)
    })
  })

  const data: Data = DATA[index]
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-vib'>
        <Header navigation={navigation} onSelect={handleSelect} />
        <Page loaded={loaded}>
          <TapListener>
            <ScrollView
              forwardRef={fn => (scrollTo.current = fn)}
              contentContainerStyle={styles.contentContainerStyle}
              onScroll={() => {
                uiStore.closePopableSubject()
              }}
            >
              <Title text={`${data.title} (${data.desc})`.replace('日到', '至')} size='primary' />
              {data.data.map((item, index) => {
                const Component = index ? BlockTrend : BlockNew
                return (
                  <Component key={item.key} style={_.mt.lg} navigation={navigation} raw={item} />
                )
              })}
              <Pagination index={index} onSelect={handleSelect} />
            </ScrollView>
          </TapListener>
        </Page>
      </Component>
    )
  })
}

export default VIB
