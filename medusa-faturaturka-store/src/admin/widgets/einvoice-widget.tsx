import { useState, useRef } from "react";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import {
  Container,
  Select,
  Button,
  Label,
  Input,
  StatusBadge,
  Drawer,
} from "@medusajs/ui";
import { DetailWidgetProps, AdminCustomer } from "@medusajs/framework/types";
import { idTypes } from "../helpers/constants";
import { getTaxpayerInfo } from "../services/FaturaturkaService";

const EInvoiceWidget = ({ data }: DetailWidgetProps<AdminCustomer>) => {
  const [isEInvoice, setIsEInvoice] = useState("");
  const [isTaxpayer, setIsTaxpayer] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleTaxpayer = async (formData: any) => {
    const {
      idType,
      id,
      isEInvoice,
    }: { idType: string; id: string | number; isEInvoice: boolean } = formData;

    const storedToken: string | null = localStorage.getItem("faturaTurkaToken");
    validateData(idType, id, storedToken);

    try {
      if (idType && id && storedToken && isEInvoice) {
        const result = await getTaxpayerInfo(id.toString(), storedToken);

        if (!result.ok) {
          alert("Unauthorized user!");
          if (formRef.current) {
            formRef.current.reset();
          }
          throw new Error("Unathorized user.");
        }
        if (result.EInvoiceUser) {
          setIsTaxpayer(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const validateData = (
    idType: string,
    id: string | number,
    storedToken: string | null
  ) => {
    if (
      (idType === "vkn" && id.toString().length !== 10) ||
      (idType === "tckn" && id.toString().length !== 11)
    ) {
      alert("Please check your vkn/tckn");
      throw new Error("Invalid ID length");
    }

    if (!storedToken) {
      alert("Authorization token is required, please log in.");
      throw new Error("Please log in.");
    }
  };

  return (
    <Container className="p-4">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Check Customer Taxpayer Status
      </Button>
      {isTaxpayer !== null && (
        <Container className="mt-4 w-2/4">
          <StatusBadge color={isTaxpayer ? "green" : "red"}>
            {isTaxpayer
              ? "This customer is an e-invoice taxpayer"
              : "This customer is not an e-invoice taxpayer"}
          </StatusBadge>
        </Container>
      )}

      <Drawer open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Check Taxpayer Status</Drawer.Title>
          </Drawer.Header>
          <Container className="flex flex-col p-6">
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleTaxpayer({
                  idType: formData.get("idType"),
                  id: formData.get("id"),
                  isEInvoice: formData.get("isEInvoice"),
                });
              }}
            >
              <Container className="mb-4">
                <Label className="block mb-2">ID Type</Label>
                <Select name="idType">
                  <Select.Trigger>
                    <Select.Value placeholder="Select a id type" />
                  </Select.Trigger>
                  <Select.Content>
                    {idTypes.map((item) => (
                      <Select.Item key={item.value} value={item.value}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Container>

              <Container className="mb-4">
                <Label className="block mb-2">ID</Label>
                <Input
                  type="text"
                  name="id"
                  className="w-full p-2 border rounded"
                />
              </Container>

              <Container className="mb-4">
                <Label className="block mb-2">E-Invoice Status</Label>

                <Select
                  name="isEInvoice"
                  onValueChange={(value) => setIsEInvoice(value)}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select is e-invoice customer or not" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item key={0} value={"true"}>
                      Yes
                    </Select.Item>
                    <Select.Item key={1} value={"false"}>
                      No
                    </Select.Item>
                  </Select.Content>
                </Select>
              </Container>

              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isEInvoice !== "true"}
              >
                Check TaxPayer
              </Button>
            </form>

            {isTaxpayer !== null && (
              <Container className="mt-4">
                <StatusBadge color={isTaxpayer ? "green" : "red"}>
                  {isTaxpayer
                    ? "This customer is an e-invoice taxpayer"
                    : "This customer is not an e-invoice taxpayer"}
                </StatusBadge>
              </Container>
            )}
          </Container>
        </Drawer.Content>
      </Drawer>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "customer.details.before",
});

export default EInvoiceWidget;
