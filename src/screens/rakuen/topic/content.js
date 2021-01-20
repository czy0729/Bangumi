/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:35:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, RenderHtml, Loading, Text, Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'

function Content(props, { $, navigation }) {
  const event = {
    id: '帖子.跳转',
    data: {
      from: '#1',
      topicId: $.topicId
    }
  }

  const { translateResult } = $.state
  const isGroup = $.topicId.includes('group/')
  return (
    <View style={styles.html}>
      {isGroup && !$.html && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
      {translateResult.length ? (
        <View>
          {translateResult.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              <Text style={_.mt.md} size={13} type='sub'>
                {item.src}
              </Text>
              <Text style={_.mt.xs} size={15}>
                {item.dst}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        !!$.html && (
          <>
            {$.isEp && (
              <IconTouchable
                style={styles.iconTranslate}
                name='translate'
                size={18}
                onPress={$.doTranslate}
              >
                <Heatmap id='帖子.翻译内容' />
              </IconTouchable>
            )}
            <View style={_.mt.md}>
              <RenderHtml
                html={$.html}
                onLinkPress={href => appNavigate(href, navigation, {}, event)}
              />
              <Heatmap
                bottom={133}
                id='帖子.跳转'
                data={{
                  to: 'Blog',
                  alias: '日志'
                }}
                transparent
              />
              <Heatmap
                bottom={100}
                id='帖子.跳转'
                data={{
                  to: 'CatalogDetail',
                  alias: '目录'
                }}
                transparent
              />
              <Heatmap
                bottom={67}
                id='帖子.跳转'
                data={{
                  to: 'Topic',
                  alias: '帖子'
                }}
                transparent
              />
              <Heatmap
                bottom={34}
                id='帖子.跳转'
                data={{
                  to: 'Mono',
                  alias: '人物'
                }}
                transparent
              />
              <Heatmap
                id='帖子.跳转'
                data={{
                  to: 'WebBrowser',
                  alias: '浏览器'
                }}
                transparent
              />
            </View>
          </>
        )
      )}
    </View>
  )
}

export default obc(Content)

const styles = _.create({
  html: {
    minHeight: 120
  },
  loading: {
    height: 120
  },
  iconTranslate: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0
  }
})
