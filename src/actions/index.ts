import { defineAction, z } from "astro:actions";
import { Client } from "@notionhq/client";

export const prerender = false;

export const server = {
  addcomment: defineAction({
    accept: "form",
    input: z.object({ comment: z.string() }),
    handler: async ({ comment }) => {
      const notion = new Client({
        auth: import.meta.env.NOTION_TOKEN,
      });

      try {
        await notion.pages.create({
          parent: {
            database_id: import.meta.env.DB_ID,
          },
          properties: {
            Name: {
              title: [
                {
                  text: {
                    content: "問い合わせ",
                  },
                },
              ],
            },
            Date: {
              date: {
                start: new Date().toISOString(),
              },
            },
            Text: {
              rich_text: [
                {
                  text: {
                    content: comment,
                  },
                },
              ],
            },
            Product: {
              select: {
                name: "zen tonic",
              },
            },
          },
        });
        return { message: "Success" };
      } catch {
        return { message: "Failed" };
      }
    },
  }),
};
