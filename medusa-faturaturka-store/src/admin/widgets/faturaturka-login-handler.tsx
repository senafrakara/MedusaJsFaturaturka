import { useEffect } from "react";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { getFaturaTurkaToken } from "../services/FaturaturkaService";

const FaturaturkaLoginTokenHandler = () => {
  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await getFaturaTurkaToken();
        localStorage.setItem("faturaTurkaToken", JSON.stringify(data));
      } catch (error) {
        alert("Error getting FaturaTurka token ");
        console.error("Error getting FaturaTurka token:", error);
      }
    };

    getToken();
  });

  return <></>;
};

export const config = defineWidgetConfig({
  zone: "login.after",
});

export default FaturaturkaLoginTokenHandler;
