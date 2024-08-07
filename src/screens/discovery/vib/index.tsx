/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:42:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:31:36
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { TapListener } from '@_'
import { _, uiStore } from '@stores'
import BlockNew from './component/block-new'
import BlockTrend from './component/block-trend'
import Pagination from './component/pagination'
import Title from './component/title'
import Header from './header'
import { useVIBPage } from './hooks'
import { memoStyles } from './styles'
import { Props } from './types'

/** 评分月刊 */
const VIB = ({ navigation }: Props) => {
  const { data, index, loaded, scrollTo, handleSelect } = useVIBPage()
  const current = data[index]
  const handleForwardRef = useCallback((fn: any) => (scrollTo.current = fn), [])
  const handleScroll = useCallback(() => {
    uiStore.closePopableSubject()
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-vib'>
        <Header
          navigation={navigation}
          data={data.map(item => item.title)}
          onSelect={handleSelect}
        />
        <TapListener>
          <Page loaded={loaded}>
            <ScrollView
              forwardRef={handleForwardRef}
              contentContainerStyle={styles.contentContainerStyle}
              onScroll={handleScroll}
            >
              <Title
                text={`${current.title} (${current.desc})`.replace('日到', '至')}
                size='primary'
              />
              {current.data.map((item, index) => {
                const Component = index ? BlockTrend : BlockNew
                return (
                  <Component
                    key={item.title}
                    style={_.mt.lg}
                    navigation={navigation}
                    title={item.title}
                    data={item.data}
                  />
                )
              })}
              <Pagination data={data} index={index} onSelect={handleSelect} />
            </ScrollView>
          </Page>
        </TapListener>
      </Component>
    )
  })
}

export default VIB
