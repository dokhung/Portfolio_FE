# Web Portfolio

React・TypeScript・Vite・React Router・Axios・Tailwind CSS v4で作成した、日本語のポートフォリオサイトです。採用担当者が一覧で制作物の概要・担当範囲・使用技術を確認し、作品名や「作品を開く」から実際の作品ページへ移動できる構成になっています。

初期データには、今後制作する予定の「ToDoリスト」を「企画中」として登録しています。現在は作品ページの枠だけを用意しており、ToDo機能は未実装です。完成した制作実績としては扱っていません。現時点では公開デプロイを行っていません。

## 起動と確認

このフォルダー単独でGit管理・チェックアウト・起動できます。親フォルダーの設定には依存しません。以下のコマンドは、このREADMEがあるディレクトリで実行します。`.env` のコピーはファイルがない初回のみ行い、既存の設定を上書きしないでください。

```sh
cp .env.example .env
npm install
npm run dev
```

開発サーバーは `http://localhost:<FRONTEND_PORT>/` で起動します。ポートは、このフォルダーの `.env` の `FRONTEND_PORT` で指定します。

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
├── layouts/SiteLayout.tsx            # 共通ヘッダー・フッターとページを組み合わせる
├── layouts/ProjectLayout.tsx         # URLから作品情報を選び、上部バーの表示状態と作品枠を管理
├── pages/PortfolioPage.tsx           # 一覧用の紹介文とリストを組み合わせる
├── pages/AboutPage.tsx               # 自己紹介ページ（本文は空欄）
├── pages/NotFoundPage.tsx            # 存在しないURLの案内
├── projects/todo-list/               # ToDoリストの作品専用フォルダー
│   └── TodoListPage.tsx              # ToDo機能の実装先（現在は空のコンポーネント）
├── components/portfolio/             # 作品を掲載するための共通UI
│   ├── PortfolioHeader.tsx           # ポートフォリオのヘッダー・ナビゲーション
│   ├── PortfolioFooter.tsx           # ポートフォリオのフッター
│   ├── PortfolioIntro.tsx            # 一覧ページの見出し・紹介文・掲載数
│   ├── ProjectList.tsx              # カテゴリーの絞り込み・一覧表示
│   ├── ProjectCard.tsx              # 各制作物の概要とリンク
│   ├── ProjectStatusBadge.tsx       # 作品の制作状況
│   ├── ProjectToolbar.tsx           # 戻るリンク・作品名・状態と、バーの表示切り替え
│   └── ProjectPageFrame.tsx         # 余白を設けない全幅の作品本体の領域
├── components/ui/ArrowIcon.tsx       # 共通アイコン
├── data/portfolio.ts                # プロフィール・制作物のローカルデータ
├── lib/api.ts                       # 共通のAxiosクライアント
├── vite-env.d.ts                    # 環境変数の型
└── index.css                        # Tailwind CSS・テーマ
```

`/` に制作物の一覧、`/about` に自己紹介、`/projects/todo-list` にToDoリストの作品ページを表示し、定義されていないURLには案内ページを表示します。ヘッダーの「制作実績」「自己紹介」から各ページへ移動できます。自己紹介は一覧ページから分離し、本文は空欄にしています。

作品ページには独立した `ProjectLayout` を使い、画面の横幅と高さを広く使って作品本体を表示します。`ProjectLayout` が現在のURLに一致する `projects` データを選び、`ProjectToolbar` と `ProjectPageFrame` を組み合わせます。上部バーには一覧へ戻るリンクと小さな作品名・制作状況を表示します。本文には共通の大きな見出しや外側の余白を設けず、上部バーの直下から全幅で作品を表示します。

上部バーの「バーを隠す」を押すと、バーの領域がなくなり、作品本体をブラウザーの全幅・全高で表示できます。非表示中は右上の小さな「バーを表示」ボタンで元に戻せます。切り替えても作品本体は再マウントしないため、入力中の内容など、作品のコンポーネントが持つ状態を維持します。バーの表示状態は `ProjectLayout` が管理し、`ProjectToolbar` は操作UIを担当します。状態は保存せず、ページの再読み込みや一覧に戻ってからの再入場時はバーを表示します。

`src/projects/todo-list/TodoListPage.tsx` は、ToDo機能を実装するための空のコンポーネントです。ここに制作するToDoリストのコンポーネントを配置してください。掲載用の作品名と「企画中」は上部バーに表示するため、作品本体の見出し・余白・UIは各作品に合わせて実装できます。タスクの登録・編集・削除・保存処理やToDo用APIは、まだ実装していません。

作品は `src/projects/<作品名>/` に1作品ずつまとめます。作品専用のコンポーネントや画像は、その中に必要に応じて `components/`・`assets/` を作って配置します。作品を掲載するための共通UIは `src/components/portfolio/`、汎用アイコンなどは `src/components/ui/` に配置してください。ポートフォリオの枠と作品本体を分けることで、作品側では制作する機能だけを実装できます。

React Routerの機能は `react-router` から読み込みます。ページ間の移動には `Link` または `NavLink` を使用します。一覧・自己紹介などのポートフォリオ内のページは `SiteLayout` の `Outlet`、`/projects/` 配下の作品本体は `ProjectLayout` の `Outlet` に表示します。

新しいページを追加する場合は、例えば `src/pages/ContactPage.tsx` を作成し、`src/App.tsx` に読み込みとルートを追加します。

```tsx
import { ContactPage } from './pages/ContactPage'

// SiteLayoutを使用するRouteの中に追加します。
<Route path="contact" element={<ContactPage />} />
```

## バックエンドとの接続準備

Spring Bootのバックエンドは、別のGitリポジトリとして管理できます。バックエンド側のREADMEに従って起動し、フロントエンドの `.env` に接続先を設定します。バックエンドの設定ファイルやDB接続情報は、このリポジトリには不要です。

開発サーバーでは、`http://localhost:<FRONTEND_PORT>/api/...` へのリクエストを `http://<BACKEND_HOST>:<BACKEND_PORT>/api/...` に転送します。`src/lib/api.ts` の `apiClient` は、ベースURL `/api`、タイムアウト10秒、JSONレスポンスの受け取りを共通設定しています。

開発サーバーの `FRONTEND_PORT`、API転送先の `BACKEND_HOST`・`BACKEND_PORT` は、このフォルダーの `.env` から読み込みます。`BACKEND_HOST`・`BACKEND_PORT` は、実際に起動するバックエンドの接続先に合わせてください。プロセスに同名の環境変数を指定した場合はそちらを優先します。`npm run dev`・`npm run preview` では、これらにコード内の既定値がないため、すべて設定してください。本番用の `npm run build` では、この開発サーバー用設定は不要です。これらの設定はViteのサーバー側でのみ使用します。変更後はViteの開発サーバーを再起動してください。

現在は接続のための設定のみで、業務用のAPIエンドポイントや取得処理はありません。制作物の一覧は引き続き `src/data/portfolio.ts` のローカルデータを使用します。画面を開いてもバックエンドへのリクエストは発生しません。

今後、バックエンドにAPIを実装した後で、取得する処理から次のように呼び出せます。この例は実装の参考であり、現在の画面では実行していません。

```ts
import { apiClient } from './lib/api'
import type { Project } from './data/portfolio'

const response = await apiClient.get<Project[]>('/projects')
const projects = response.data
```

この場合の呼び出し先は `/api/projects` です。`Project[]` はレスポンスが制作物の配列で返る場合の型指定です。実際のAPIの項目名・構造に合わせて型と取得処理を調整してください。型指定だけでは、受け取ったデータの内容は検証されません。

このフォルダーの `.env` には、次の項目を設定します。

| 変数 | 用途 |
| --- | --- |
| `VITE_API_BASE_URL` | ブラウザーに公開するAPIのベースURL（通常は `/api`） |
| `FRONTEND_PORT` | 開発サーバー・プレビューのポート |
| `BACKEND_HOST` | 開発用APIプロキシの転送先ホスト |
| `BACKEND_PORT` | 開発用APIプロキシの転送先ポート |

`VITE_API_BASE_URL` が未設定または空文字の場合は `/api` を使用します。`VITE_` で始まる環境変数はブラウザーに公開されるため、DB情報やパスワードは記載しないでください。DB接続用の `.env` はバックエンド側だけで管理します。

実際の `.env`・`.env.*` は、このフォルダーの `.gitignore` でGit管理から除外し、共有用の `.env.example` だけをコミットします。個別のGitリポジトリにアップする場合も、`.gitignore` と `.env.example` を含めてください。

Viteのプロキシ設定は `npm run dev` 用です。本番公開時は、公開先で `/api` をバックエンドへ転送し、フロントエンドのページURLを `index.html` に戻す設定が必要です。別オリジンのAPIを使用する場合は、ビルド時に `VITE_API_BASE_URL=https://APIのホスト名/api` を設定し、バックエンドのCORS設定でフロントエンドの公開先を許可してください。

## プロジェクトの追加・編集

作品をこのサイト内で表示する場合は、作品ページのコンポーネント・URLのルート・一覧データの3つを追加します。`projects` 配列にデータを追加するだけでは、作品本体の画面は作成されません。

1. 作品専用フォルダー `src/projects/my-project/` を作り、その中に `MyProjectPage.tsx` を作成します。ページ本体に実装するか、同じ作品フォルダーのコンポーネントを表示します。

   ```tsx
   import { MyProject } from './components/MyProject'

   export function MyProjectPage() {
     return <MyProject />
   }
   ```

   この例では `src/projects/my-project/components/MyProject.tsx` に `MyProject` を作成します。名前やインポート先は、自分の制作物に合わせて変更してください。

2. `src/App.tsx` でページを読み込み、`ProjectLayout` を指定した `Route` の中にルートを追加します。作品ページの `path` は `projects/作品名` として指定します。

   ```tsx
   import { MyProjectPage } from './projects/my-project/MyProjectPage'

   // <Route element={<ProjectLayout />}> の中に追加します。
   <Route path="projects/my-project" element={<MyProjectPage />} />
   ```

3. `src/data/portfolio.ts` の `projects` 配列に作品を追加し、`path` に上で登録したURLを設定します。このデータの `title`・`status` は、一覧と作品ページの上部バーの両方で使います。作品コンポーネント内に掲載用のタイトル・制作状況・戻るリンクを追加する必要はありません。APIによる取得処理を実装するまでは、この配列の順序が表示順になります。

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
  path: '/projects/my-project',
} satisfies Project,
```

- `id` はプロジェクトごとに異なる値にします。
- `category` は `Webサイト`・`アプリ`・`その他`、`status` は `企画中`・`制作中`・`公開中`・`制作完了` から選びます。
- `path` はこのサイト内に登録した作品ページのURLです。設定すると作品名と「作品を開く」から移動できます。サイト内に作品ページを用意しない場合は省略してください。
- `url` は公開サイト、`repositoryUrl` はソースコードの実際のURLです。未公開の場合は項目自体を省略してください。対応するリンクは表示されません。
- `highlights` は実装した機能や工夫した点を文字列の配列で追加できます。省略すると表示されません。
- `image` は任意です。作品フォルダーの `assets/` に置いた画像を `src/data/portfolio.ts` でインポートし、`image` に指定できます（例：`import myProjectImage from '../projects/my-project/assets/preview.webp'`、`image: myProjectImage`）。画像には遅延読み込みを使用し、省略時は画像欄を表示しません。

ToDoリストの実装を始めたら `status` を `制作中` に更新し、実際の担当範囲・使用技術・期間を記入してください。実装した内容に合わせて `highlights` を追加し、公開や制作完了のタイミングで `status`・リンクも更新してください。

## プロフィールとサイト情報

- 同じデータファイルの `profile` で、名前・見出し・紹介文を編集します。
- `about` は `/about` の自己紹介本文です。初期値は空文字で、本文を表示しません。空欄でも自己紹介ページとヘッダーのリンクは表示されます。
- `email`・`githubUrl` は任意です。空文字の場合、対応するリンクを表示しません。
- `index.html` の `title` と `meta description` を自分の紹介に合わせて変更します。
- ファビコンは `public/favicon.svg` を差し替えるか、`index.html` のアイコンパスを変更します。
- URLの設定は `src/App.tsx`、一覧ページの組み合わせは `src/pages/PortfolioPage.tsx`、自己紹介ページの構成は `src/pages/AboutPage.tsx` で変更します。`src/layouts/SiteLayout.tsx` と `ProjectLayout.tsx` は、共通UIと各ページを組み合わせる役割です。
- ヘッダー・フッター・一覧の紹介文は `src/components/portfolio/` の `PortfolioHeader.tsx`・`PortfolioFooter.tsx`・`PortfolioIntro.tsx` で変更します。
- 制作物の一覧表示は同フォルダーの `ProjectList.tsx`・`ProjectCard.tsx`、制作状況の表示は `ProjectStatusBadge.tsx` で変更します。作品本体の全幅レイアウトは `ProjectPageFrame.tsx`、上部バーの戻るリンク・作品名・状態・表示切り替えのUIは `ProjectToolbar.tsx`、表示状態の管理は `ProjectLayout.tsx` で変更します。
- 作品そのものの機能・画面は `src/projects/<作品名>/`、サイト全体の色やフォントは `src/index.css` で変更します。

## Tailwind CSS

Tailwind CSS v4の `@tailwindcss/vite` プラグインを使用し、ビルド時に必要なCSSを生成します。テーマは `src/index.css` の `@theme` で定義しています。別途 `tailwind.config.js` やPostCSSの設定ファイルを追加する必要はありません。

クラスの探索範囲は `src` と `index.html` に限定しています。別のディレクトリに画面ファイルを追加する場合は、`src/index.css` の `@source` にパスを登録してください。クラスは `bg-${color}-500` のように動的に組み立てず、完全な文字列で記述します。
