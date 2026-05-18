import {
  useCallback,
  useState,
} from "react";

import { getMenuRequest }
from "../services/menu.service";

import { MenuItem }
from "../types/menu";

export const useMenuApi = () => {
  const [loading, setLoading] =
    useState(false);

  const [menu, setMenu] =
    useState<MenuItem[]>([]);

  const getMenu = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMenuRequest();
      setMenu(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }, []);

  return {
    menu,
    loading,
    getMenu,
  };
};