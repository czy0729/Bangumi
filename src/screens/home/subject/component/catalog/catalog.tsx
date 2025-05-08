/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:28:20
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Heatmap } from '@components'
import { InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { FROZEN_ARRAY, FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TITLE_CATALOG } from '../../ds'
import IconCatalog from '../icon/catalog'
import IconHidden from '../icon/hidden'
import Item from './item'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Catalog = memo(
  ({ styles, showCatalog = true, catalog = FROZEN_ARRAY, onSwitchBlock = FROZEN_FN }) => {
    const { list, onScroll } = useHorizontalLazy(catalog)
    return (
      <InView style={stl(styles.container, !showCatalog && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={
            showCatalog ? <IconCatalog /> : <IconHidden name={TITLE_CATALOG} value='showCatalog' />
          }
          icon={!showCatalog && 'md-navigate-next'}
          splitStyles
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
                scrollEventThrottle={16}
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
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    ...props,

    /** 目录数据每次请求都不一样, 此数据非重要数据, 使判断只认数组长度, 减少重渲染次数 */
    catalog: props.catalog.length
  })
)

export default Catalog
