import { use } from "i18next";
import React, { useEffect, useState } from "react";
import fire from "../../fire";

const ProductSearch = () => {
  const firestore = fire.firestore();
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    console.log(searchProduct);
    const citiesRef = firestore.collection("messages");
    // const snapshot = await citiesRef
    //   .where("text", ">=", searchProduct)
    //   .orderBy("text", "asc")
    //   .limit(3)
    //   .get();
    const snapshot = await citiesRef
      .where("text" && "description", ">=", searchProduct)
      .get();

    if (snapshot.empty) {
      console.log("no matching documents");
    }

    const list = [];

    snapshot.forEach((doc) => {
      console.log(doc.data());
      list.push(doc.data());
    });
    setProducts(list);
  };

  useEffect(() => {
    fetchData();
  }, [searchProduct]);

  console.log(products);

  return (
    <div>
      <input
        onChange={(e) => setSearchProduct(e.target.value)}
        value={searchProduct}
      />
    </div>
  );
};

export default ProductSearch;
