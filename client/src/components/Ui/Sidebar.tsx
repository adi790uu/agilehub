import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary bg-transparent border-none drawer-button hover:bg-slate-700"
        >
          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Link to="/home">
            <li>
              <a>Home</a>
            </li>
          </Link>
          <Link to="/home/manage">
            <li>
              <a>Manage</a>
            </li>
          </Link>
          <Link to="/home/profile">
            <li>
              <a>Profile</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
