/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-21 00:50:53
 */
export function getType(value: string) {
  switch (value) {
    case '动画':
    case '主角':
      return 'main'

    case '书籍':
    case '配角':
      return 'primary'

    case '游戏':
    case '生效':
      return 'success'

    case '动画化':
    case '音乐':
    case '客串':
    case 'H':
      return 'warning'

    case '停用':
      return 'danger'

    case '想看':
    case '想读':
    case '想听':
    case '想玩':
    case '已收藏':
      return 'mainActive'

    case '看过':
    case '读过':
    case '听过':
    case '玩过':
      return 'warningActive'

    case '在看':
    case '在读':
    case '在听':
    case '在玩':
      return 'primaryActive'

    case '搁置':
    case '抛弃':
    case '只读':
      return 'waitActive'

    default:
      return ''
  }
}
