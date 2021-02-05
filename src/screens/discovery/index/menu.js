/*
 * @Author: czy0729
 * @Date: 2019-10-02 02:57:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-05 16:07:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont, Image, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import ImageAnitama from '@assets/images/anitama.jpg'

const menus = [
  {
    title: '排行榜',
    icon: 'shou-fu',
    path: 'Rank'
  },
  {
    title: '番剧',
    icon: 'xin-fan',
    path: 'Anime'
  },
  {
    title: '漫画',
    icon: 'bang-dan',
    path: 'Manga'
  },
  {
    title: '文库',
    icon: 'menu',
    path: 'Wenku'
  },
  {
    title: '每日放送',
    icon: 'calendar',
    path: 'Calendar'
  },
  {
    title: '索引',
    icon: 'list',
    path: 'Browser'
  },
  {
    title: '目录',
    icon: 'bag',
    path: 'Catalog'
  },
  {
    title: '更多',
    icon: 'more',
    path: 'open'
  },
  {
    title: '日志',
    icon: 'ri-zhi',
    path: 'DiscoveryBlog'
  },
  {
    title: '搜索',
    icon: 'search',
    path: 'Search'
  },
  {
    title: '小圣杯',
    icon: 'trophy',
    path: 'Tinygrail'
  },
  {
    title: '推荐',
    icon: 'like',
    path: 'Guess',
    login: true
  },
  {
    title: '趋势',
    icon: 'fen-xi',
    path: 'netabare',
    login: true
  },
  {
    title: '标签',
    icon: 'paihang',
    path: 'Tags'
  },
  {
    title: '时间线',
    icon: 'time',
    path: 'UserTimeline',
    login: true
  },
  // {
  //   title: '好友',
  //   icon: 'friends',
  //   path: 'Friends',
  //   login: true
  // },
  // {
  //   title: '我的人物',
  //   icon: 'like',
  //   path: 'Character',
  //   login: true
  // },
  {
    title: 'Anitama',
    icon: 'anitama',
    path: 'Anitama'
  },
  {
    title: '收起',
    icon: 'arrow-left',
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
                    {item.icon === 'anitama' ? (
                      <Image
                        src={ImageAnitama}
                        size={26}
                        radius={13}
                        placeholder={false}
                        quality={false}
                        fadeDuration={0}
                      />
                    ) : (
                      <Iconfont
                        style={item.path === 'close' && styles.rotate}
                        name={item.icon}
                        size={26}
                        color={_.__colorPlain__}
                      />
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
    paddingHorizontal: _.wind
  },
  wrap: {
    width: (_.window.width - 2 * _.wind) * 0.249,
    marginTop: _.md + 2
  },
  item: {
    width: itemWidth
  },
  iconWrap: {
    width: 52
  },
  icon: {
    width: 52,
    height: 52,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: 52
  },
  rotate: {
    transform: [
      {
        rotate: '90deg'
      }
    ]
  }
}))
