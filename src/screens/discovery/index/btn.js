/*
 * @Author: czy0729
 * @Date: 2021-06-11 15:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 11:58:02
 */
import React from 'react'
import { View, Clipboard } from 'react-native'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { getLastPath } from '@screens/_/base/filter-switch'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { matchBgmUrl } from '@utils/match'
import { appNavigate } from '@utils/app'

const itemWidth = (_.window.width - 2 * _.wind) / 4

function Btn({ item }, { $, navigation }) {
  const styles = memoStyles()
  const { username, id } = $.userInfo
  const { path, login, icon, iconList, title } = item
  return (
    <Touchable
      style={_.container.touch}
      onPress={async () => {
        if (login && !username && !id) return info('请先登陆')
        if (path === 'open') return $.openMenu()
        if (path === 'close') return $.closeMenu()

        t('发现.跳转', {
          to: path
        })

        if (path === 'Anime') {
          const path = await getLastPath()
          return navigation.push(path)
        }

        if (path === 'netabare') {
          return open('https://netaba.re/trending')
        }

        if (path === 'UserTimeline') {
          return navigation.push(path, {
            userId: username || id
          })
        }

        if (path === 'Link') {
          const content = await Clipboard.getString()
          const urls = matchBgmUrl(content, true) || []
          const url = urls[0]
          if (!url) {
            $.toggleLinkModal()
            return true
          }

          return appNavigate(url, navigation)
        }

        return navigation.push(
          path,
          login
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
              {icon === 'wiki' ? (
                <Text type='__plain__' size={13} bold>
                  Wiki
                </Text>
              ) : (
                <>
                  <Iconfont name={icon} size={24} color={_.__colorPlain__} />
                  {!!iconList && (
                    <Flex style={styles.iconList} justify='center'>
                      <Iconfont
                        name={iconList}
                        size={iconList === 'md-folder' ? 14 : 16}
                        color={_.__colorPlain__}
                      />
                    </Flex>
                  )}
                </>
              )}
            </Flex>
          </View>
          <Text style={_.mt.sm} size={13} align='center' bold>
            {title}
          </Text>
        </Flex>
      </Flex>
      <Heatmap
        id='发现.跳转'
        data={{
          to: path,
          alias: title
        }}
      />
    </Touchable>
  )
}

export default obc(Btn)

const memoStyles = _.memoStyles(_ => ({
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
  }
}))
