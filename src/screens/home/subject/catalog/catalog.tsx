/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 09:33:52
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { SectionTitle, Cover, PreventTouchPlaceholder } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import IconCatalog from '../icon/catalog'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(({ navigation, styles, showCatalog, catalog, onSwitchBlock }) => {
  // global.rerender('Subject.Catalog.Main')

  const { list, onScroll } = useHorizontalLazy(catalog)
  return (
    <View style={!showCatalog ? [_.mt.lg, _.short] : _.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          showCatalog ? <IconCatalog /> : <IconHidden name='目录' value='showCatalog' />
        }
        icon={!showCatalog && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showCatalog')}
      >
        目录
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
                <Touchable
                  key={item.id}
                  style={styles.item}
                  animate
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'CatalogDetail',
                      from: '条目',
                      catalogId: item.id
                    })

                    navigation.push('CatalogDetail', {
                      catalogId: item.id
                    })
                  }}
                >
                  <Flex>
                    <Cover src={item.avatar} size={_.r(40)} radius shadow type='目录' />
                    <Flex.Item style={_.ml.md}>
                      <Text
                        style={styles.text}
                        size={11}
                        lineHeight={12}
                        bold
                        numberOfLines={1}
                      >
                        {HTMLDecode(item.title)}
                      </Text>
                      <Text size={10} lineHeight={11} type='sub' numberOfLines={1}>
                        {HTMLDecode(item.name)}
                      </Text>
                    </Flex.Item>
                  </Flex>
                </Touchable>
              ))}
            </ScrollView>
            <Heatmap id='条目.跳转' from='条目' />
          </View>
        </>
      )}
      <PreventTouchPlaceholder />
    </View>
  )
}, DEFAULT_PROPS)
