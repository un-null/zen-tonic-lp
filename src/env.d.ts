/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_TOKEN: string;
  readonly DB_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
