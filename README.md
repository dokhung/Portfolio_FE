# Web Portfolio

React・TypeScript・Vite・React Router・Axios・Tailwind CSS v4で作成した、日本語のポートフォリオ一覧ページです。採用担当者が制作物の概要・担当範囲・使用技術を確認できる構成になっています。

初期データには、現在制作中のこのポートフォリオサイトだけを登録しています。架空の制作実績は含めていません。現時点では公開デプロイを行っていません。

## 起動と確認

`frontend` ディレクトリで実行します。

```sh
npm install
npm run dev
```

開発サーバーは `http://localhost:3000/` で起動します。

```sh
npm run build   # 型チェックと本番用ファイルの生成（dist）
npm run preview # 本番ビルドのプレビュー
npm run lint    # コードの静的チェック
```

## ファイル構成

```text
src/
├── main.tsx                         # BrowserRouterでアプリ全体を囲む
├── App.tsx                          # URLとページの対応を定義
├── layouts/SiteLayout.tsx            # 共通ヘッダー・フッターとOutlet
├── pages/PortfolioPage.tsx           # 制作物の一覧ページ
├── pages/AboutPage.tsx               # 自己紹介ページ（本文は空欄）
├── pages/NotFoundPage.tsx            # 存在しないURLの案内
├── components/projects/ProjectList.tsx # 一覧・絞り込み結果の表示
├── components/projects/ProjectCard.tsx # 各制作物の表示
├── components/ui/ArrowIcon.tsx       # 共通アイコン
├── data/portfolio.ts                # プロフィール・制作物のローカルデータ
├── lib/api.ts                       # 共通のAxiosクライアント
├── vite-env.d.ts                    # 環境変数の型
└── index.css                        # Tailwind CSS・テーマ
```

`/` に制作物の一覧、`/about` に自己紹介を表示し、定義されていないURLには案内ページを表示します。ヘッダーの「制作実績」「自己紹介」から各ページへ移動できます。自己紹介は一覧ページから分離し、本文は空欄にしています。

React Routerの機能は `react-router` から読み込みます。ページ間の移動には `Link` または `NavLink` を使用し、`SiteLayout` の `Outlet` に各ページを表示します。

新しいページを追加する場合は、例えば `src/pages/ContactPage.tsx` を作成し、`src/App.tsx` に読み込みとルートを追加します。

```tsx
import { ContactPage } from './pages/ContactPage'

// SiteLayoutを使用するRouteの中に追加します。
<Route path="contact" element={<ContactPage />} />
```

## バックエンドとの接続準備

Spring Bootのバックエンドは `../backend` にあります。起動方法とローカルPostgreSQLの設定は、[バックエンドのREADME](../backend/README.md)を参照してください。

開発サーバーでは、`http://localhost:3000/api/...` へのリクエストを `http://127.0.0.1:8080/api/...` に転送します。`src/lib/api.ts` の `apiClient` は、ベースURL `/api`、タイムアウト10秒、JSONレスポンスの受け取りを共通設定しています。

転送先のポートはルートの `.env` の `BACKEND_PORT` に合わせます。環境変数 `BACKEND_PORT` を指定した場合はそちらを優先し、未指定時は `8080` を使用します。変更後はViteの開発サーバーを再起動してください。

現在は接続のための設定のみで、業務用のAPIエンドポイントや取得処理はありません。制作物の一覧は引き続き `src/data/portfolio.ts` のローカルデータを使用します。画面を開いてもバックエンドへのリクエストは発生しません。

今後、バックエンドにAPIを実装した後で、取得する処理から次のように呼び出せます。この例は実装の参考であり、現在の画面では実行していません。

```ts
import { apiClient } from './lib/api'
import type { Project } from './data/portfolio'

const response = await apiClient.get<Project[]>('/projects')
const projects = response.data
```

この場合の呼び出し先は `/api/projects` です。`Project[]` はレスポンスが制作物の配列で返る場合の型指定です。実際のAPIの項目名・構造に合わせて型と取得処理を調整してください。型指定だけでは、受け取ったデータの内容は検証されません。

ベースURLを変更する場合は、`frontend/.env.example` を `frontend/.env.local` にコピーし、`VITE_API_BASE_URL` を設定して開発サーバーを再起動します。未設定または空文字の場合は `/api` を使用します。`VITE_` で始まる環境変数はブラウザーに公開されるため、秘密情報は記載しないでください。

Viteのプロキシ設定は `npm run dev` 用です。本番公開時は、公開先で `/api` をバックエンドへ転送し、フロントエンドのページURLを `index.html` に戻す設定が必要です。別オリジンのAPIを使用する場合は、ビルド時に `VITE_API_BASE_URL=https://APIのホスト名/api` を設定し、バックエンドのCORS設定でフロントエンドの公開先を許可してください。

## プロジェクトの追加・編集

`src/data/portfolio.ts` の `projects` 配列を編集します。APIによる取得処理を実装するまでは、この配列の順序が表示順になります。

次のオブジェクトを配列の末尾に追加し、実際の制作内容に書き換えてください。`satisfies Project` により、入力内容を型チェックできます。

```ts
{
  id: 'my-project',
  title: 'プロジェクト名',
  description: '何を作り、どのような目的や課題に取り組んだかを記入します。',
  category: 'Webサイト',
  role: '自分が担当した作業を記入します。',
  tags: ['実際に使用した技術'],
  period: '制作期間を記入します。',
  status: '制作中',
} satisfies Project,
```

- `id` はプロジェクトごとに異なる値にします。
- `category` は `Webサイト`・`アプリ`・`その他`、`status` は `制作中`・`公開中`・`制作完了` から選びます。
- `url` は公開サイト、`repositoryUrl` はソースコードの実際のURLです。未公開の場合は項目自体を省略してください。対応するリンクは表示されません。
- `highlights` は実装した機能や工夫した点を文字列の配列で追加できます。省略すると表示されません。
- `image` は任意です。画像を `public/projects/name.webp` に置き、`image: '/projects/name.webp'` と指定します。画像には遅延読み込みを使用し、省略時は画像欄を表示しません。

公開や制作完了のタイミングで、現在のポートフォリオサイトの `status`・期間・リンクも更新してください。

## プロフィールとサイト情報

- 同じデータファイルの `profile` で、名前・見出し・紹介文を編集します。
- `about` は `/about` の自己紹介本文です。初期値は空文字で、本文を表示しません。空欄でも自己紹介ページとヘッダーのリンクは表示されます。
- `email`・`githubUrl` は任意です。空文字の場合、対応するリンクを表示しません。
- `index.html` の `title` と `meta description` を自分の紹介に合わせて変更します。
- ファビコンは `public/favicon.svg` を差し替えるか、`index.html` のアイコンパスを変更します。
- URLの設定は `src/App.tsx`、一覧ページの構成は `src/pages/PortfolioPage.tsx`、自己紹介ページの構成は `src/pages/AboutPage.tsx`、共通ヘッダー・フッターは `src/layouts/SiteLayout.tsx` で変更します。
- 制作物の表示は `src/components/projects/ProjectList.tsx` と `ProjectCard.tsx`、色やフォントは `src/index.css` で変更します。

## Tailwind CSS

Tailwind CSS v4の `@tailwindcss/vite` プラグインを使用し、ビルド時に必要なCSSを生成します。テーマは `src/index.css` の `@theme` で定義しています。別途 `tailwind.config.js` やPostCSSの設定ファイルを追加する必要はありません。

クラスの探索範囲は `src` と `index.html` に限定しています。別のディレクトリに画面ファイルを追加する場合は、`src/index.css` の `@source` にパスを登録してください。クラスは `bg-${color}-500` のように動的に組み立てず、完全な文字列で記述します。
