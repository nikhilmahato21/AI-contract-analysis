export function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contract Analysis</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard  vv
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
