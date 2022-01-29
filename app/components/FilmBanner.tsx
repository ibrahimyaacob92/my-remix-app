import { Link } from "remix";
import { Film } from "~/service/films";

type Props = {
  film: Film;
};

export default function ({ film }: Props) {
  return (
    <div>
      <div className="w-full h-96 overflow-hidden relative">
        <div className="w-full h-full flex flex-col absolute justify-between item-start">
          <Link className="text-white p-5 text-2xl hover:underline" to="/films">
            Go Back
          </Link>
          <div className="bg-slate-700/60 p-5">
            <div className="text-6xl font-bold text-white">{film.title}</div>
          </div>
        </div>
        <img
          src={film.movie_banner}
          className="w-full h-auto"
          style={{ marginTop: -100 }}
        />
      </div>
    </div>
  );
}
