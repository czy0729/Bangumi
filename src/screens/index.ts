/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:04:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 01:04:37
 */
import { lazy } from 'react'

// Login
export const Login = lazy(() => import('./login/index/index'))
export const LoginAssist = lazy(() => import('./login/assist'))
export const LoginV2 = lazy(() => import('./login/v2'))
export const LoginToken = lazy(() => import('./login/token'))

// Discovery
export const ADV = lazy(() => import('./discovery/adv'))
export const Anime = lazy(() => import('./discovery/anime'))
export const Anitama = lazy(() => import('./discovery/anitama'))
export const Award = lazy(() => import('./discovery/award'))
export const BiWeekly = lazy(() => import('./discovery/bi-weekly'))
export const Browser = lazy(() => import('./discovery/browser'))
export const Calendar = lazy(() => import('./discovery/calendar'))
export const Catalog = lazy(() => import('./discovery/catalog'))
export const CatalogDetail = lazy(() => import('./discovery/catalog-detail'))
export const Channel = lazy(() => import('./discovery/channel'))
export const Character = lazy(() => import('./discovery/character'))
export { default as Discovery } from './discovery/index/index'
export const DiscoveryBlog = lazy(() => import('./discovery/blog'))
export const Dollars = lazy(() => import('./discovery/dollars'))
export const Game = lazy(() => import('./discovery/game'))
export const Hentai = lazy(() => import('./discovery/hentai'))
export const Like = lazy(() => import('./discovery/like'))
export const Manga = lazy(() => import('./discovery/manga'))
export const NSFW = lazy(() => import('./discovery/nsfw'))
export const Pic = lazy(() => import('./discovery/pic'))
export const Rank = lazy(() => import('./discovery/rank'))
export const Recommend = lazy(() => import('./discovery/recommend'))
export const Search = lazy(() => import('./discovery/search'))
export const Series = lazy(() => import('./discovery/series'))
export const Staff = lazy(() => import('./discovery/staff'))
export const Tags = lazy(() => import('./discovery/tags'))
export const VIB = lazy(() => import('./discovery/vib'))
export const Wenku = lazy(() => import('./discovery/wenku'))
export const Wiki = lazy(() => import('./discovery/wiki'))
export const WordCloud = lazy(() => import('./discovery/word-cloud'))
export const Yearbook = lazy(() => import('./discovery/yearbook'))

// Timeline
export const Say = lazy(() => import('./timeline/say'))
export { default as Timeline } from './timeline/v2'

// Home
export const Characters = lazy(() => import('./home/characters'))
export const Episodes = lazy(() => import('./home/episodes'))
export { default as Home } from './home/v2'
export const Mono = lazy(() => import('./home/mono'))
export const Overview = lazy(() => import('./home/overview'))
export const Persons = lazy(() => import('./home/persons'))
export const Preview = lazy(() => import('./home/preview'))
export const Rating = lazy(() => import('./home/rating'))
export const Subject = lazy(() => import('./home/subject'))
export const SubjectCatalogs = lazy(() => import('./home/catalogs'))
export const SubjectInfo = lazy(() => import('./home/info'))
export const SubjectWiki = lazy(() => import('./home/wiki'))
export const Tag = lazy(() => import('./home/tag'))
export const Typerank = lazy(() => import('./home/typerank'))
export const Voices = lazy(() => import('./home/voices'))
export const Works = lazy(() => import('./home/works'))

// Rakuen
export const Blog = lazy(() => import('./rakuen/blog'))
export const Board = lazy(() => import('./rakuen/board'))
export const Group = lazy(() => import('./rakuen/group'))
export const Mine = lazy(() => import('./rakuen/mine'))
export const Notify = lazy(() => import('./rakuen/notify'))
export { default as Rakuen } from './rakuen/v2'
export const RakuenHistory = lazy(() => import('./rakuen/history'))
export const RakuenSearch = lazy(() => import('./rakuen/search'))
export const RakuenSetting = lazy(() => import('./rakuen/setting'))
export const Reviews = lazy(() => import('./rakuen/reviews'))
export const Topic = lazy(() => import('./rakuen/topic'))
export const UGCAgree = lazy(() => import('./rakuen/ugc-agree'))

// User
export const Actions = lazy(() => import('./user/actions'))
export const Backup = lazy(() => import('./user/backup'))
export const Blogs = lazy(() => import('./user/blogs'))
export const Catalogs = lazy(() => import('./user/catalogs'))
export const DEV = lazy(() => import('./user/dev'))
export const Friends = lazy(() => import('./user/friends'))
export const Milestone = lazy(() => import('./user/milestone'))
export const OriginSetting = lazy(() => import('./user/origin-setting'))
export const PM = lazy(() => import('./user/pm'))
export const Qiafan = lazy(() => import('./user/qiafan'))
export const ServerStatus = lazy(() => import('./user/server-status'))
export const Setting = lazy(() => import('./user/setting'))
export const Smb = lazy(() => import('./user/smb'))
export const Sponsor = lazy(() => import('./user/sponsor'))
export { default as User } from './user/v2'
export const UserSetting = lazy(() => import('./user/user-setting'))
export const UserTimeline = lazy(() => import('./user/timeline'))
export const Zone = lazy(() => import('./user/zone'))

// Tinygrail
export { default as Tinygrail } from './tinygrail/index/index'
export const TinygrailAdvance = lazy(() => import('./tinygrail/advance'))
export const TinygrailAdvanceAsk = lazy(() => import('./tinygrail/advance-ask'))
export const TinygrailAdvanceAuction = lazy(() => import('./tinygrail/advance-auction'))
export const TinygrailAdvanceAuction2 = lazy(() => import('./tinygrail/advance-auction2'))
export const TinygrailAdvanceBid = lazy(() => import('./tinygrail/advance-bid'))
export const TinygrailAdvanceSacrifice = lazy(() => import('./tinygrail/advance-sacrifice'))
export const TinygrailAdvanceState = lazy(() => import('./tinygrail/advance-state'))
export const TinygrailBid = lazy(() => import('./tinygrail/bid'))
export const TinygrailCharaAssets = lazy(() => import('./tinygrail/chara-assets'))
export const TinygrailClipboard = lazy(() => import('./tinygrail/clipboard'))
export const TinygrailDeal = lazy(() => import('./tinygrail/deal'))
export const TinygrailICO = lazy(() => import('./tinygrail/ico'))
export const TinygrailICODeal = lazy(() => import('./tinygrail/ico-deal'))
export const TinygrailItems = lazy(() => import('./tinygrail/items'))
export const TinygrailLogs = lazy(() => import('./tinygrail/logs'))
export const TinygrailLotteryRank = lazy(() => import('./tinygrail/lottery-rank'))
export const TinygrailNew = lazy(() => import('./tinygrail/new-bangumi'))
export const TinygrailOverview = lazy(() => import('./tinygrail/overview'))
export const TinygrailRelation = lazy(() => import('./tinygrail/relation'))
export const TinygrailRich = lazy(() => import('./tinygrail/rich'))
export const TinygrailSacrifice = lazy(() => import('./tinygrail/sacrifice'))
export const TinygrailSearch = lazy(() => import('./tinygrail/search'))
export const TinygrailStar = lazy(() => import('./tinygrail/star'))
export const TinygrailTemples = lazy(() => import('./tinygrail/temples'))
export const TinygrailTopWeek = lazy(() => import('./tinygrail/top-week'))
export const TinygrailTrade = lazy(() => import('./tinygrail/trade'))
export const TinygrailTransaction = lazy(() => import('./tinygrail/transaction'))
export const TinygrailTree = lazy(() => import('./tinygrail/tree'))
export const TinygrailTreeRich = lazy(() => import('./tinygrail/tree-rich'))
export const TinygrailValhall = lazy(() => import('./tinygrail/valhall'))
export const TinygrailWiki = lazy(() => import('./tinygrail/wiki'))

// Other
export const BilibiliSync = lazy(() => import('./web-view/bilibili-sync'))
export const DoubanSync = lazy(() => import('./web-view/douban-sync'))
export const Information = lazy(() => import('./web-view/information'))
export const Log = lazy(() => import('./web-view/log'))
export const Playground = lazy(() => import('./web-view/playground'))
export const Share = lazy(() => import('./web-view/share'))
export const Tips = lazy(() => import('./web-view/tips'))
export const Versions = lazy(() => import('./web-view/versions'))
export const WebBrowser = lazy(() => import('./web-view/web-browser'))
export const WebView = lazy(() => import('./web-view'))
export const Webhook = lazy(() => import('./web-view/webhook'))
