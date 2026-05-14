import { useState } from "react";
import { getMenuRequest } from "../services/menu.service";

export const useMenuApi = () => {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    try {
      setLoading(true);

      const data = await getMenuRequest();

      setMenu(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    menu,
    loading,
    getMenu,
  };
};