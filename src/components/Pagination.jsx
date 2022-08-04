import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fire from "../fire";
import { getCard } from "./actions/GetCards";

const Pagination = () => {
  const dispatch = useDispatch();
  let cards = useSelector((state) => state.card.cards);
  const [next, setNext] = useState();
  const [lastVisible, setLastVisieble] = useState();

  useEffect(() => {
    dispatch(getCard());
  }, []);
  const db = fire.firestore();

  function getPagination() {
    var first = db
      .collection("messages")
      .orderBy("year", "desc")
      .limit(5)
      .get();

    first.then((documentSnapshots) => {
      // Get the last visible document

      //   documentSnapshots.forEach((doc) => {
      //     console.log(doc.data());
      //   });
      console.log(documentSnapshots);

      var lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible.id);
      setLastVisieble(lastVisible.id);

      // Construct a new query starting at this document,
      // get the next 25 cities.
    });
  }

  function nextPage() {
    var next = db
      .collection("messages")
      .orderBy("text")
      .startAfter(7)
      .limit(5)
      .get();

    next.then((data) => {
      const list = [];
      // console.log(data);

      data.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      console.log(list);
      setNext(list);
    });
  }

  return (
    <div>
      <button onClick={() => getPagination()}>get pagination</button>
      <button onClick={() => nextPage()}>next page</button>
      {next?.map((item) => (
        <div>{item.text}</div>
      ))}
    </div>
  );
};

export default Pagination;
