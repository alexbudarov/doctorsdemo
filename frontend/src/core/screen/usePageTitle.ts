import { useEffect } from "react";

const defaultPageTitle = "Appointments";

export function usePageTitle(pageTitle: string) {
  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = defaultPageTitle;
    };
  }, [pageTitle]);
}
