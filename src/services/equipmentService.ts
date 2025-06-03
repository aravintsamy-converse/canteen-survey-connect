import axios from 'axios';
import type { EquipmentDetails } from "../pages/CanteenSurvay";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchEquipmentDetails = async (
  eqpId: string
): Promise<EquipmentDetails | null> => {
  const url = `${apiUrl}/equipment-detail?canteenconnect_guid=${encodeURIComponent(
    eqpId
  )}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch equipment details. Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Ensure data.value exists and has at least one item
    const parsedData = data.value?.[0]?.msdyn_account || {};

    // Destructure with default values
    const {
      name = "Unknown Equipment",
      address1_line1 = "Unknown Address",
      address1_city = "",
      address1_stateorprovince = "",
      address1_postalcode = "",
    } = parsedData;

    return {
      name,
      address1_line1,
      address1_city,
      address1_stateorprovince,
      address1_postalcode,
    };
  } catch (error) {
    console.error("Error fetching equipment details:", error);
    return null;
  }
};

export const fetchMachineProblem = async (
  eqpId: string
): Promise<EquipmentDetails | null> => {
  const url = `${apiUrl}/equipment-detail?canteenconnect_guid=${encodeURIComponent(
    eqpId
  )}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch equipment details. Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Ensure data.value exists and has at least one item
    const parsedData = data.value?.[0]?.msdyn_account || {};

    // Destructure with default values
    const {
      name = "Unknown Equipment",
      address1_line1 = "Unknown Address",
      address1_city = "",
      address1_stateorprovince = "",
      address1_postalcode = "",
    } = parsedData;

    return {
      name,
      address1_line1,
      address1_city,
      address1_stateorprovince,
      address1_postalcode,
    };
  } catch (error) {
    console.error("Error fetching equipment details:", error);
    return null;
  }
};

