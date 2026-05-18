"use client";

import * as React from "react";

type AppRouterContextValue = {
  pathname: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
};

const AppRouterContext = React.createContext<AppRouterContextValue | null>(
  null
);

function readPathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

const NAVIGATE_EVENT = "app-router:navigate";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

export function AppRouterProvider({ children }: { children: React.ReactNode }) {
  const pathname = React.useSyncExternalStore(
    subscribe,
    readPathname,
    () => "/"
  );

  const navigate = React.useCallback<AppRouterContextValue["navigate"]>(
    (to, options) => {
      if (typeof window === "undefined") return;
      if (options?.replace) {
        window.history.replaceState(null, "", to);
      } else {
        window.history.pushState(null, "", to);
      }
      window.dispatchEvent(new Event(NAVIGATE_EVENT));
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    []
  );

  const value = React.useMemo<AppRouterContextValue>(
    () => ({ pathname, navigate }),
    [pathname, navigate]
  );

  return (
    <AppRouterContext.Provider value={value}>
      {children}
    </AppRouterContext.Provider>
  );
}

export function useAppRouter(): AppRouterContextValue {
  const ctx = React.useContext(AppRouterContext);
  if (!ctx) {
    return {
      pathname: "/",
      navigate: () => {
        // no-op during SSR
      },
    };
  }
  return ctx;
}

export function useAppPathname(): string {
  return useAppRouter().pathname;
}

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  replace?: boolean;
};

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  function AppLink({ href, replace, onClick, children, ...rest }, ref) {
    const { navigate } = useAppRouter();
    return (
      <a
        ref={ref}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }
          event.preventDefault();
          navigate(href, { replace });
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
