/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 04:53:02
 */
export const NAMESPACE = 'Users'

export const INIT_FRIENDS_ITEM = {
  avatar: '',
  userId: '',
  userName: ''
}

export const INIT_USERS = {
  userId: '',
  userName: '',
  sign: '',
  join: '',
  hobby: '',
  percent: '',
  recent: '',
  doing: '',
  collect: '',
  wish: '',
  onHold: '',
  dropped: '',
  connectUrl: '',
  disconnectUrl: '',
  formhash: '',
  userStats: {
    avg: '',
    chart: {
      '1': '',
      '10': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      '9': ''
    },
    collect: '',
    percent: '',
    scored: '',
    std: '',
    total: ''
  }
}

export const INIT_CHARACTERS = {
  avatar: '',
  id: '',
  name: ''
}

export const INIT_RECENTS_ITEM = {
  id: '',
  cover: '',
  type: '',
  href: '',
  name: '',
  nameJP: '',
  info: '',
  star: '',
  starInfo: '',
  actors: [] // <INIT_RECENTS_ACTORS_ITEM>
}

export const INIT_RECENTS_ACTORS_ITEM = {
  id: '',
  avatar: '',
  name: '',
  info: ''
}

export const INIT_BLOGS = {
  id: '',
  title: '',
  cover: '',
  time: '',
  replies: '',
  content: '',
  tags: []
}

export const INIT_CATALOGS = {
  id: '',
  title: '',
  userId: '',
  userName: '',
  avatar: '',
  time: '',
  num: ''
}
