import { CommentEntry } from "~/service/comments";
import { Form, useTransition } from "remix";

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const transition = useTransition();

  return (
    <div>
      <h2 className="text-3xl mb-2">COmmnunity Comments</h2>
      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment) => (
          <div className="p-4 rounded border border-slate-400">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}
        <div className="p-4 rounded border border-slate-400">
          <Form method="post">
            <fieldset disabled={transition.state === "submitting"}>
              <label className="inline-block my-2">Name:</label>
              <input
                name="name"
                type="text"
                className="p-4 rounded border border-slate-400"
              />

              <label className="inline-block my-2">Message:</label>
              <input
                name="message"
                type="text"
                className="p-4 rounded border border-slate-400"
              />
              <button type="submit" className="bg-blue-500 text-white">
                {transition.state === "submitting"
                  ? "Adding Comment..."
                  : "Add Comment"}
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
