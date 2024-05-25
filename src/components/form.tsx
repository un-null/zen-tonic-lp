import { actions } from "astro:actions";
import { useState, type ComponentProps } from "react";

export const Form = () => {
  const [pending, setPending] = useState(false);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await actions.addcomment(formData);
    setPending(false);
    alert(result.message);

    location.replace("/");
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-screen-sm flex-col gap-4 rounded-sm bg-white p-8 shadow"
    >
      <label htmlFor="comment" className="flex flex-col gap-2">
        コメント
        <textarea
          id="comment"
          name="comment"
          rows={3}
          className="resize-none rounded-sm border border-zinc-300 p-2.5 outline-none focus:border-zinc-800"
        />
        <div className="mx-auto mt-4 w-fit">
          <button
            type="submit"
            className="rounded-sm bg-[#2483e2] px-6 py-2 font-bold text-white"
          >
            {pending ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "送信する"
            )}
          </button>
        </div>
      </label>
    </form>
  );
};
