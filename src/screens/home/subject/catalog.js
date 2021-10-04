/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-04 11:31:30
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { memo, obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconCatalog from './icon/catalog'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  showCatalog: true,
  subjectId: 0,
  catalog: [],
  onSwitchBlock: Function.prototype
}

const Catalog = memo(
  ({ navigation, showCatalog, subjectId, catalog, onSwitchBlock }) => {
    rerender('Subject.Catalog.Main')

    return (
      <View style={[_.mt.lg, !showCatalog && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={
            showCatalog ? (
              <IconCatalog />
            ) : (
              <IconHidden name='目录' value='showCatalog' />
            )
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
                showsHorizontalScrollIndicator={false}
              >
                {catalog.map(item => (
                  <Touchable
                    key={item.id}
                    style={styles.item}
                    onPress={() => {
                      t('条目.跳转', {
                        to: 'CatalogDetail',
                        from: '条目',
                        subjectId,
                        catalogId: item.id
                      })

                      navigation.push('CatalogDetail', {
                        catalogId: item.id
                      })
                    }}
                  >
                    <Flex>
                      <Cover
                        src={item.avatar}
                        size={40 * _.ratio}
                        radius
                        shadow
                        type='目录'
                      />
                      <Flex.Item style={_.ml.md}>
                        <Text size={12} bold numberOfLines={2}>
                          {HTMLDecode(item.title)}
                          <Text style={_.mt.xs} size={10} lineHeight={12} type='sub'>
                            {' '}
                            {item.name}
                          </Text>
                        </Text>
                      </Flex.Item>
                    </Flex>
                  </Touchable>
                ))}
              </ScrollView>
              <Heatmap
                id='条目.跳转'
                data={{
                  from: '条目'
                }}
              />
            </View>
          </>
        )}
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Catalog')

  const { showCatalog } = systemStore.setting
  if (showCatalog === -1) return null

  const { catalog } = $.subjectFormHTML
  let _catalog = catalog || []
  if ($.filterDefault || $.isLimit) {
    _catalog = _catalog.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  if (!_catalog.length) return null

  return (
    <Catalog
      navigation={navigation}
      showCatalog={showCatalog}
      catalog={_catalog}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md + 4
  },
  scrollView: {
    marginTop: _.md,
    marginBottom: -_.md
  },
  item: {
    width: _.window.contentWidth * 0.4 * _.ratio,
    marginRight: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
