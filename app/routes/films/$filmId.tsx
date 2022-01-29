import { getFilmById, Film } from "~/service/films";
import invariant from "tiny-invariant";
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  MetaFunction,
  ActionFunction,
  redirect,
} from "remix";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "~/components/CharacterList";
import CommentsList from "~/components/CommentsList";
import { addComment } from "~/service/comments";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId");
  const film = await getFilmById(params.filmId);
  console.log(`Prefetch running --> ${film.title}`);
  return film;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
    description: data.description,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.filmId, "expected params.filmId");
  const body = await request.formData();
  console.log("body --> ", Object.fromEntries(body));
  const comment = {
    name: body.get("name") as string,
    message: body.get("message") as string,
    filmId: params.filmId,
  };

  await addComment(comment);

  return redirect(`/films/${params.filmId}`);
};

export default function () {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>
      </div>
      <div className="flex py-5 space-x-5 px-10">
        <CharacterList characters={film.characters} />

        <div className="flex-1 flex flex-col justify-between">
          <Outlet />

          <CommentsList filmId={film.id} comments={film.comments || []} />
        </div>
      </div>
    </div>
  );
}
