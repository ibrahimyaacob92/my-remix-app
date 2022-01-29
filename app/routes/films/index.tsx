import {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
  useLoaderData,
  Form,
  Link,
} from "remix";
import { getFilms, Film } from "~/service/films";

// SERVER SIDE
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  console.log(title);
  return getFilms(title);
};

// CLIENT SIDE
export const meta: MetaFunction = () => {
  return {
    title: "Films | Studio Ghibli",
    description: "List of Films",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};
export default function () {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search
          <input
            type="text"
            name="title"
            placeholder="placeholder"
            className="border-2 rounded py-2 px-3"
          />
        </label>
        <button type="submit" className="bg-blue-500">
          Search
        </button>
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            key={film.id}
            to={film.id}
            prefetch="intent" //"render"
            title={film.description}
            className="hover:shadow-2xl hover:scale-105 hover:cursor-pointer"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
