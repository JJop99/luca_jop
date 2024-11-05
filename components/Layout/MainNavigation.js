import Link from "next/link";
import React, { useRef, useState, Fragment } from "react";
import classes from "./MainNavigation.module.sass";
import { Popover, Transition } from "@headlessui/react";
import LanguageSelector from "../Language/LanguageSelector";
import { useLanguage } from '../../context/LanguageContext';

const MainNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const buttonRef = useRef(null);
  const timeoutDuration = 200;
  let timeout;
  
  const { language } = useLanguage();

  const solutions = {
    it: [
      { name: "Lavori", href: "/works" },
      { name: "Percorso", href: "/about" },
      { name: "Contatti", href: "/contacts" }
    ],
    en: [
      { name: "Works", href: "/works" },
      { name: "About", href: "/about" },
      { name: "Contacts", href: "/contacts" }
    ]
  };

  const selectedSolutions = solutions[language] || solutions['it'];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const onMouseEnter = (open) => {
    clearTimeout(timeout);
    if (open) return;
    return buttonRef.current?.click();
  };

  const onMouseLeave = (open) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  const onClickClose = () => {
    return buttonRef.current?.click();
  };

  return (
    <div className={classes.nav}>
      <Popover className={classes.popover}>
        <div className={classes["popover__div--position-orizontal"]}>
          <div className={classes["popover__div--position-vertical"]}>
            <Popover.Group as="nav" className={classes.popoverGroup}>
              <Popover className={classes.popover}>
                {({ open }) => (
                  <>
                    <div>
                      <Popover.Button
                        ref={buttonRef}
                        className={`${classes.popoverButton} ${classNames(
                          open
                            ? "popoverButton--state-open"
                            : "popoverButton--state-close"
                        )}`}
                        onMouseEnter={() => onMouseEnter(open)}
                        onMouseLeave={() => onMouseLeave(open)}
                      >
                        <Link href="/">Luca Jop</Link>
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter={classes["transition--state-enter"]}
                        enterFrom={classes["transition--state-enterFrom"]}
                        enterTo={classes["transition--state-enterTo"]}
                        leave={classes["transition--state-leave"]}
                        leaveFrom={classes["transition--state-leaveFrom"]}
                        leaveTo={classes["transition--state-leaveTo"]}
                      >
                        <Popover.Panel className={classes.popoverPanel}>
                          <div
                            className={classes["popover__div--container"]}
                            onMouseEnter={() => onMouseEnter(open)}
                            onMouseLeave={() => onMouseLeave(open)}
                            onClick={onClickClose}
                          >
                            <div className={classes["popover__div--menu"]}>
                              {selectedSolutions.map((item) => (
                                <Link legacyBehavior key={item.name} href={item.href}>
                                  <a className={classes["link__a"]}>
                                    <div>
                                      <p className={classes["link__item"]}>
                                        {item.name}
                                      </p>
                                    </div>
                                  </a>
                                </Link>
                              ))}
                              <LanguageSelector />
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </div>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </div>
      </Popover>

      <nav>
        <section className={classes["section-burger-menu"]}>
          <div className={classes["section-burger--left"]}>
            <Link href="/">Luca Jop</Link>
          </div>

          <div
            className={
              !isNavOpen
                ? classes["section-burger--right"]
                : classes["menuNav--hide"]
            }
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classes.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <Transition
            show={isNavOpen}
            as={Fragment}
            enter={classes["transition--state-enter"]}
            enterFrom={classes["transition--state-enterFrom"]}
            enterTo={classes["transition--state-enterTo"]}
            leave={classes["transition--state-leave"]}
            leaveFrom={classes["transition--state-leaveFrom"]}
            leaveTo={classes["transition--state-leaveTo"]}
          >
            <div
              className={
                isNavOpen ? classes["menuNav--show"] : classes["menuNav--hide"]
              }
            >
              <div
                className={classes["section-burger--right"]}
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={classes.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <div className={classes["popover__div--menu"]}>
                {selectedSolutions.map((item) => (
                  <Link legacyBehavior key={item.name} href={item.href}>
                    <a className={classes["link__a"]}>
                      <div onClick={() => setIsNavOpen(false)}>
                        <p className={classes["link__item"]}>{item.name}</p>
                      </div>
                    </a>
                  </Link>
                ))}
                <LanguageSelector />
              </div>
            </div>
          </Transition>
        </section>
      </nav>
    </div>
  );
};

export default MainNavigation;
