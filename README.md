# E-Invoice Taxpayer Status Widget

This widget checks if a customer is registered for e-invoice and provides the status based on the given information. It is designed to be used within the MedusaJS Admin dashboard.

## Overview

The E-Invoice Widget allows users to check the taxpayer status of a customer by providing the following details:

- **ID Type**: The type of ID (e.g., `vkn` or `tckn`).
- **ID**: The actual ID value corresponding to the ID type.
- **E-Invoice Status**: Whether the customer is an e-invoice customer (`Yes` or `No`).

The widget will display the status of the customer based on whether the information matches a taxpayer in the external service.

## Features

- Displays a **drawer** UI component for interaction with the form.
- Form fields include:
  - **ID Type**: Dropdown with ID types (`vkn`, `tckn`).
  - **ID**: Input field for the customer’s ID number.
  - **E-Invoice Status**: Dropdown for choosing whether the customer should be an e-invoice customer (`Yes`/`No`).
- Validates the entered data before submitting:
  - Validates the length of the ID based on the ID type (`vkn` should be 10 characters, `tckn` should be 11 characters).
  - Checks if a valid authorization token exists in `localStorage`.
- If the customer is found as an e-invoice taxpayer, it will display a **green status badge**. If not, a **red status badge** will be shown.
- In case of unauthorized access (HTTP status 401), an alert is shown, and the form data is cleared for privacy and security purposes.

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Ensure MedusaJS environment is set up**.

4. **Integrate this widget**:
    - Add the `EInvoiceWidget` component in your Medusa Admin configuration.
    - Make sure that the `FaturaturkaService` (for handling API requests) is correctly implemented.

## Usage

To use the widget, follow these steps:

1. **Trigger the widget**: 
   The widget can be triggered by a button click that opens the drawer.
   
2. **Provide data**:
   - Choose an **ID Type** (e.g., `vkn` or `tckn`).
   - Enter the **ID**.
   - Select whether the customer is an **E-Invoice Customer** (`Yes` or `No`).
   
3. **Submit the form**:
   When the form is submitted, the data is sent to an API to check the taxpayer status. If the customer is not authorized, the form data will be cleared, and an error message will be shown.

## API Integration

### `getTaxpayerInfo`

This function makes an API call to the FaturaTurka service to fetch taxpayer information:

```ts
const result = await getTaxpayerInfo(id.toString(), storedToken);
```

The `getTaxpayerInfo` function expects the following parameters:

- **id**: Customer’s ID.
- **storedToken**: Authorization token retrieved from `localStorage`.

In case of unauthorized access (HTTP status 401), the form will be cleared, and an alert will be displayed to the user.

## Folder Structure

The widget is located within the `src/admin/widgets` directory.

```text
src/
  admin/
    widgets/
      einvoice-widget.tsx  # The main widget file
      faturaturkalogin-handler-widget.tsx  # The widget file to take token from Faturaturka service
  helpers/
    constants.ts         # Contains ID types like `vkn` and `tckn`
  services/
    FaturaturkaService.ts # Contains API call logic
```

## Development

To contribute or test this widget locally, follow these steps:

1. **Run your MedusaJS Admin Panel locally**.
2. **Start your application**:
    ```bash
    npm run dev
    ```
3. **Navigate to the customer details section** where the widget is configured to appear.

## Testing

To test the widget:

1. **Test for valid IDs**: 
   - Use valid customer IDs and check if the taxpayer status is correctly displayed.
   
2. **Test for invalid IDs**:
   - Enter invalid IDs and verify that the validation alerts are shown.
   
3. **Test for unauthorized access**:
   - Simulate a 401 error from the API and ensure the form is cleared and the appropriate alert is shown.

## Future Enhancements

- **Improve error handling** for network issues or unexpected API responses.
- **Add unit and integration tests** for form validation and API interactions.
- **Expand widget functionality** to support additional customer data and status checks.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
