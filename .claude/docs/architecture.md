# 项目架构

## 技术栈

- **框架**: React Native + Expo SDK 54
- **状态管理**: MobX 6 + mobx-react 9
- **导航**: React Navigation 6（native-stack + bottom-tabs）
- **样式**: StyleSheet + 自定义 memoStyles() 缓存
- **HTTP**: 自封装 fetchAPI() + fetchHTML()（cheerio 解析 HTML）
- **构建**: EAS (Expo Application Services) + Fastlane + GitHub Actions

## 目录结构

```
├── src/                    # 主源码
│   ├── App.tsx             # 统一入口（平台差异用 ANDROID 常量分流, 不再拆分 App.android.tsx）
│   ├── config.ts           # 开发标志、代理、初始路由
│   ├── components/         # ~80+ 可复用 UI 组件
│   ├── screens/            # 所有页面模块（~100+）
│   ├── stores/             # MobX domain stores（18个）
│   ├── navigations/        # React Navigation 配置
│   ├── constants/          # 常量: index.ts 为 barrel; 子模块 api/, app/, assets/, cdn/, data/, device/, env/, events/, host/, html/, i18n/, init/, model/, site/, text/, tinygrail/ (运行时管线已迁至 utils/cdn)
│   ├── styles/             # 主题、颜色、布局工具 (index.ts 汇总; colors.ts 单文件; layout.ts 布局/尺寸; device.ts 设备检测; tools/ 工具类: container/margin/border/effect/legacy)
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # ~35+ 工具模块
│   └── assets/             # 图片、字体、JSON 数据
├── android/                # Android 原生工程
├── ios/                    # iOS 原生工程
├── packages/               # 多环境构建目录（android/ios/ipa/web，含各环境独立 package.json、node_modules、patches）
├── web/                    # IPA 构建、更新日志
├── patches/                # patch-package 补丁（当前环境的运行时镜像，由 packages/env.js 切换时自动同步）
├── [deprecated]/           # 废弃代码
└── test/                   # 测试数据
```

## 多环境切换（yarn env）

- 通过 `yarn env [ios | android | ipa | web]` 切换开发环境，脚本见 `packages/env.js`
- 各环境独立维护 `packages/{env}/package.json`、`node_modules`、`patches/`
- 切换时：备份当前环境配置到 `packages/{当前env}/`，恢复目标环境配置到根目录
- **patches 同步**：备份时根目录 `patches/` 同步到 `packages/{当前env}/patches/`，恢复时 `packages/{目标env}/patches/` 同步到根目录 `patches/`。因此根目录 `patches/` 始终是当前环境的补丁镜像，补丁只需在各环境目录维护一处

## 路径别名

| 别名 | 路径 |
|------|------|
| `@components` | `src/components/` |
| `@screens` | `src/screens/` |
| `@stores` | `src/stores/` |
| `@utils` | `src/utils/` |
| `@constants` | `src/constants/` |
| `@styles` | `src/styles/` |
| `@types` | `src/types/` |
| `@assets` | `src/assets/` |
| `@src` | `src/` |

## 导航结构

- **Root Stack**: `createNativeStackNavigator()` — 所有页面作为 Stack.Screen
- **Bottom Tab**: 6 个主 tab — Discovery / Timeline / Home / Rakuen / User / Tinygrail
- **懒加载**: 非 tab 页面使用 `React.lazy()` 代码分割
- **配置**: `src/screens/index.ts` 导出 ~100+ 页面组件

## 构建/部署

- **EAS**: `eas.json` — development / preview / production profiles
- **Fastlane**: Android 商店元数据
- **CI**: `.github/workflows/build-upstream-ipa.yml` — IPA 构建
- **发布**: `npm run pub`（eas update → production channel）
