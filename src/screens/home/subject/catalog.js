/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 19:58:28
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconCatalog from './icon/catalog'

function Catalog({ style }, { $, navigation }) {
  const { catalog } = $.subjectFormHTML
  let _catalog = catalog || []
  if ($.filterDefault || $.isLimit) {
    _catalog = _catalog.filter(
      item => !item.avatar.includes(URL_DEFAULT_AVATAR)
    )
  }
  if (!_catalog.length) {
    return null
  }

  const { showCatalog } = systemStore.setting
  return (
    <View style={[style, !showCatalog && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={showCatalog && <IconCatalog />}
        icon={!showCatalog && 'right'}
        onPress={() => $.switchBlock('showCatalog')}
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
              {_catalog.map(item => (
                <Touchable
                  key={item.id}
                  style={styles.item}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'CatalogDetail',
                      from: '条目',
                      subjectId: $.subjectId,
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
                      size={40}
                      radius
                      shadow
                      type='目录'
                    />
                    <Flex.Item style={_.ml.md}>
                      <Text size={12} bold numberOfLines={2}>
                        {item.title}
                        <Text
                          style={_.mt.xs}
                          size={10}
                          lineHeight={12}
                          type='sub'
                        >
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
}
export default obc(Catalog)

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
    width: 120,
    marginRight: _.sm
  }
})
