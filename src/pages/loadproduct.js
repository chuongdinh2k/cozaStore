import React from "react";
import { useLocation } from "react-router-dom";
function LoadProduct() {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("pageNumber");
  const q = new URLSearchParams(search).get("color");

  return (
    <div>
      this is quert pageNumber: {name} and {q}
    </div>
  );
}

export default LoadProduct;
