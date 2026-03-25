const PageNotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>

        <h1 className="mt-4 text-5xl font-semibold text-gray-900 sm:text-7xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl leading-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Go back home
          </a>

          <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support →
          </a>
        </div>
      </div>
    </main>
  );
};
export default PageNotFound