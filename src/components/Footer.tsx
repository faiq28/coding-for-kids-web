import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";

function Footer() {
  return (
    <footer
      className="
      py-6
      text-center
      border-t
      bg-white
      px-4
    "
    >
      <p className="text-gray-500">© 2026 {siteConfig.name}</p>

      <p className="text-sm text-gray-400">{siteConfig.tagline}</p>

      <p className="mt-3 text-sm text-gray-500 flex flex-wrap justify-center gap-x-5 gap-y-1">
        <Link to="/learn" className="hover:text-indigo-600">
          Learn
        </Link>
        <Link to="/playground" className="hover:text-indigo-600">
          Playground
        </Link>
        <Link to="/games" className="hover:text-indigo-600">
          Games
        </Link>
        <Link to="/challenge" className="hover:text-indigo-600">
          Challenge
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
