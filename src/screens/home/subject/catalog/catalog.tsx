/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 06:38:58
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Heatmap } from '@components'
import { InView, SectionTitle, PreventTouchPlaceholder } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { rerender } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import IconCatalog from '../icon/catalog'
import IconHidden from '../icon/hidden'
import { TITLE_CATALOG } from '../ds'
import Item from './item'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, showCatalog, catalog, onSwitchBlock }) => {
  rerender('Subject.Catalog.Main')

  const { list, onScroll } = useHorizontalLazy(catalog)
  return (
    <InView style={stl(styles.container, !showCatalog && _.short)}>
      <SectionTitle
        style={_.container.wind}
        right={
          showCatalog ? (
            <IconCatalog />
          ) : (
            <IconHidden name={TITLE_CATALOG} value='showCatalog' />
          )
        }
        icon={!showCatalog && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showCatalog')}
      >
        {TITLE_CATALOG}
      </SectionTitle>
      {showCatalog && (
        <>
          <View style={styles.scrollView}>
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              horizontal
              {...SCROLL_VIEW_RESET_PROPS}
              scrollEventThrottle={4}
              onScroll={onScroll}
            >
              {list.map(item => (
                <Item key={item.id} item={item} />
              ))}
            </ScrollView>
            <Heatmap id='条目.跳转' from='条目' />
          </View>
        </>
      )}
      <PreventTouchPlaceholder />
    </InView>
  )
}, DEFAULT_PROPS)
