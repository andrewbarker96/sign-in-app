import { useEffect, useState } from "react";
import { environment } from "../environments/environment";

const fetchContacts = async () => {
  const response = await fetch("https://ipaas.sigparser.com/api/User/Me", {
    method: "GET",
    headers: {
      "x-api-key": `${environment.sigParserAPIKey}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
  } else {
    console.error("Error fetching Contacts:", response.statusText);
  }
};
fetchContacts();
