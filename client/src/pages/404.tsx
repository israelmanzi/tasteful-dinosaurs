import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import EmptyView from '../components/EmptyView';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found!</title>
      </Helmet>
      <main className="grid min-h-screen place-items-center bg-white sm:py-32 lg:px-8">
        <div className="text-center">
          <EmptyView message="" />
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
            >
              Return back to the dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
