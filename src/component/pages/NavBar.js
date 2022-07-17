import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import constants from "../utils/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const navigateTask = () => {
    // 👇️ navigate to /
    navigate("/tasks");
  };

  const navigateAddTask = () => {
    // 👇️ navigate to /
    navigate("/add_task");
  };

  const navigateRegister = () => {
    // 👇️ navigate to /
    navigate("/register");
  };

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  const navigateManageUsers = () => {
    // 👇️ navigate to /
    navigate("/manage_users");
  };

  const handleLogout = (id) => {
    localStorage.clear();
    navigateHome();
  };

  const name = localStorage.getItem("name");
  let role = localStorage.getItem("role");
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    isLoggedIn = false;
  }

  //console.log("Role found in navbar : " + role);

  //------------------
  let navigation = null;
  if (role === "admin" || role === "employee") {
    navigation = [
      { name: "Home", href: constants.frontend_server + "/", current: false },
      {
        name: "Tasks",
        href: constants.frontend_server + "/tasks",
        onclick: { navigateLogin },
        current: false,
      },
      {
        name: "Add Task",
        href: constants.frontend_server + "/add_task",
        current: false,
      },
      {
        name: "Register",
        href: constants.frontend_server + "/register",
        current: false,
      },
      {
        name: "Log In",
        href: constants.frontend_server + "/login",
        current: false,
      },
    ];
  } else {
    navigation = [
      { name: "Home", href: constants.frontend_server + "/", current: false },
      {
        name: "Tasks",
        href: constants.frontend_server + "/tasks",
        onclick: { navigateLogin },
        current: false,
      },
      // { name: "Add Task", href: "/add_task", current: false },
      {
        name: "Register",
        href: constants.frontend_server + "/register",
        current: false,
      },
      {
        name: "Log In",
        href: constants.frontend_server + "/login",
        current: false,
      },
    ];
  }

  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.log("cuurent path : " + currentPath);

  // //-- set navigation button clicked based on path
  // for (let i = 0; i < navigation.length; i++) {
  //   if (navigation[i].href === currentPath) {
  //     navigation[i].current = true;
  //     break;
  //   }
  // }

  //------------------------------------

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-auto mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {/* <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Task Tracker"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Task Tracker"
                  />
                </div> */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={navigateHome}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </button>

                    {/* <button
                      type="button"
                      onClick={navigateTask}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Tasks
                    </button> */}

                    {role === "admin" || role === "employee" ? (
                      <button
                        type="button"
                        onClick={navigateAddTask}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Add Task
                      </button>
                    ) : (
                      <div></div>
                    )}

                    <button
                      type="button"
                      onClick={navigateRegister}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Registration
                    </button>

                    <button
                      type="button"
                      onClick={navigateLogin}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </button>

                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>

                     
                    ))} */}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {isLoggedIn ? (
                  <div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={require("../assets/dummy_avatar.png")}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}

                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {name + " ("} <b>{role}</b> {")"}
                              </p>
                            )}
                          </Menu.Item>

                          {role === "admin" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={navigateManageUsers}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Manage Users
                                </a>
                              )}
                            </Menu.Item>
                          ) : (
                            <div></div>
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Log Out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
