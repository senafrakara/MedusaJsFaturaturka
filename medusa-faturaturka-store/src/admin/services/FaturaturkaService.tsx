export const getFaturaTurkaToken = async (): Promise<string> => {
  try {
    const username = import.meta.env.VITE_MEDUSA_FATURATURKA_USERNAME;
    const password = import.meta.env.VITE_MEDUSA_FATURATURKA_PASSWORD;
    const baseUrl = import.meta.env.VITE_MEDUSA_FATURATURKA_API_URL;

    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    const response = await fetch(`${baseUrl}/Integration/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        division: "1",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token from FaturaTurka");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching FaturaTurka token:", error);
    throw error;
  }
};

export const getTaxpayerInfo = async (
  id: string,
  token: string | null
): Promise<Boolean> => {
  const baseUrl = import.meta.env.VITE_MEDUSA_FATURATURKA_API_URL;

  if (!token) {
    throw new Error("Authorization token is required.");
  }

  try {
    const body = JSON.stringify({
      Identifier: id,
      IncludeAliases: true,
    });

    const response = await fetch(`${baseUrl}/Integration/GetGbpk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching taxpayer info :", error);
    throw error;
  }
};

//if customer data update is neccessary,

/* export const updateCustomerMetadata = async (
  customerId: string,
  newMetadata: { id: string; idType: string; isEInvoice: boolean },
  storedToken: string
) => {
  await fetch(`/admin/customers/${customerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify({
      metadata: newMetadata,
    }),
  });
};
 */
