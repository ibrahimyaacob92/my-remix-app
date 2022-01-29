import { useCatch, LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { FilmCharacter, getFilmCharacter } from "~/service/films";

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, "expected params.characterId");

  // throw new Error("RAMNDOM AERREO");
  return getFilmCharacter(params.characterId);
};

export default function Character() {
  const characterDetails = useLoaderData<FilmCharacter>();
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Character Details</div>
      <div className="p-4 rounder shadow-lg border">
        <div className="text-gray-700 font-bold text-xl mb-2">
          {characterDetails.name}
        </div>
        <ul className="py-2">
          <li>Gender: {characterDetails.gender}</li>
          <li>age: {characterDetails.age}</li>
          <li>eye_color: {characterDetails.eye_color}</li>
          <li>hair_color: {characterDetails.hair_color}</li>
        </ul>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);
  if (caught.status === 404) {
    return (
      <div className="mb-3">
        <div className="text-3xl mb-2">Details</div>
        <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {caught.statusText}
          </div>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

// For something that is not expected to happen
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
