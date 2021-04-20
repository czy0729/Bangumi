/*
 * @Author: czy0729
 * @Date: 2019-10-02 02:57:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-20 19:21:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

const menus = [
  {
    title: '排行榜',
    icon: 'md-equalizer',
    path: 'Rank'
  },
  {
    title: '番剧',
    icon: 'md-live-tv',
    path: 'Anime'
  },
  {
    title: '漫画',
    icon: 'md-chrome-reader-mode',
    path: 'Manga'
  },
  {
    title: '文库',
    icon: 'md-notes',
    path: 'Wenku'
  },
  {
    title: '每日放送',
    icon: 'md-calendar-today',
    path: 'Calendar'
  },
  {
    title: '索引',
    icon: 'md-data-usage',
    path: 'Browser'
  },
  {
    title: '目录',
    icon: 'md-folder-open',
    path: 'Catalog'
  },
  {
    title: '更多',
    icon: 'md-more-horiz',
    path: 'open'
  },
  {
    title: '日志',
    icon: 'md-edit',
    path: 'DiscoveryBlog'
  },
  {
    title: '档期',
    icon: 'md-local-play',
    path: 'Staff'
  },
  {
    title: '搜索',
    icon: 'md-search',
    path: 'Search'
  },
  {
    title: '小圣杯',
    icon: 'trophy',
    path: 'Tinygrail'
  },
  {
    title: '推荐',
    icon: 'md-favorite-outline',
    path: 'Guess',
    login: true
  },
  {
    title: '趋势',
    icon: 'md-trending-up',
    path: 'netabare',
    login: true
  },
  {
    title: '标签',
    icon: 'md-bookmark-outline',
    path: 'Tags'
  },
  {
    title: '时间线',
    icon: 'md-timeline',
    path: 'UserTimeline',
    login: true
  },
  {
    title: '好友',
    icon: 'md-face',
    path: 'Friends',
    login: true
  },
  {
    title: '维基人',
    icon: 'wiki',
    path: 'Wiki'
  },
  {
    title: 'Anitama',
    icon: 'md-text-format',
    path: 'Anitama'
  },
  {
    title: '我的人物',
    icon: 'md-folder-shared',
    path: 'Character',
    login: true
  },
  {
    title: '我的目录',
    icon: 'md-folder-special',
    path: 'Catalogs',
    login: true
  },
  {
    title: '收起',
    icon: 'md-expand',
    path: 'close'
  }
]

const itemWidth = (_.window.width - 2 * _.wind) / 4

function Menu(props, { $, navigation }) {
  const styles = memoStyles()
  const { expand } = $.state
  const { username, id } = $.userInfo
  return (
    <Flex style={styles.container} wrap='wrap'>
      {menus
        .filter(
          (item, index) =>
            item.path !== (expand ? 'open' : 'close') &&
            index <= (expand ? 100 : 7)
        )
        .map(item => (
          <Touchable
            key={item.path}
            style={_.container.touch}
            onPress={() => {
              if (item.login && !username && !id) {
                info('请先登陆')
                return
              }

              if (item.path === 'open') {
                $.openMenu()
                return
              }

              if (item.path === 'close') {
                $.closeMenu()
                return
              }

              if (item.path === 'netabare') {
                t('发现.跳转', {
                  to: item.path
                })
                open('https://netaba.re/trending')
                return
              }

              if (item.path === 'UserTimeline') {
                t('发现.跳转', {
                  to: item.path
                })
                navigation.push(item.path, {
                  userId: username || id
                })
                return
              }

              t('发现.跳转', {
                to: item.path
              })
              navigation.push(
                item.path,
                item.login
                  ? {
                      userName: username || id
                    }
                  : {}
              )
            }}
          >
            <Flex style={styles.wrap} justify='center'>
              <Flex style={styles.item} direction='column' justify='center'>
                <View style={styles.iconWrap}>
                  <View style={styles.border} />
                  <Flex style={styles.icon} justify='center'>
                    {item.icon === 'wiki' ? (
                      <Text type='__plain__' size={13} bold>
                        Wiki
                      </Text>
                    ) : (
                      <>
                        <Iconfont
                          name={item.icon}
                          size={24}
                          color={_.__colorPlain__}
                        />
                        {!!item.iconList && (
                          <Flex style={styles.iconList} justify='center'>
                            <Iconfont
                              name={item.iconList}
                              size={item.iconList === 'md-folder' ? 14 : 16}
                              color={_.__colorPlain__}
                            />
                          </Flex>
                        )}
                      </>
                    )}
                  </Flex>
                </View>
                <Text style={_.mt.sm} size={13} align='center' bold>
                  {item.title}
                </Text>
              </Flex>
            </Flex>
            <Heatmap
              id='发现.跳转'
              data={{
                to: item.path,
                alias: item.title
              }}
            />
          </Touchable>
        ))}
    </Flex>
  )
}

export default obc(Menu)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingHorizontal: _.wind,
    marginTop: _.sm
  },
  wrap: {
    width: (_.window.width - 2 * _.wind) * 0.249,
    paddingVertical: _.sm
  },
  item: {
    width: itemWidth
  },
  iconWrap: {
    width: 50
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: 50
  },
  iconList: {
    position: 'absolute',
    right: 8,
    bottom: 11,
    width: 18,
    height: 18,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    overflow: 'hidden'
  },
  rotate: {
    transform: [
      {
        rotate: '90deg'
      }
    ]
  }
}))
