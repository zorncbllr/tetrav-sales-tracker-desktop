import { BreadCrumbItem, useBreadCrumbStore } from "@/stores/breadcrumb.store";
import { useLayoutEffect } from "react";

function useBreadCrumb(items: BreadCrumbItem[]) {
  const { setItems } = useBreadCrumbStore();

  useLayoutEffect(() => {
    setItems(items);
  }, []);
}

export default useBreadCrumb;
