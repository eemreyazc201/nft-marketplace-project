// CollectionDetail.js
import React from "react";
import { useParams } from "react-router-dom";

function CollectionDetail1() {
  const { collectionId } = useParams();

  // Fetch collection data based on collectionId and display details

  return (
    <div>
      <h2>Collection Detail Page</h2>
      <p>Collection ID: {collectionId}</p>
      {/* Add more details based on the fetched data */}
    </div>
  );
}

export default CollectionDetail1;
