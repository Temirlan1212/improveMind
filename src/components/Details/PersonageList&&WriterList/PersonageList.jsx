import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fire from "../../../fire";
import "./PersonageList.css";
import PersonageListAdd from "./PersonageListAdd";
import PersonageListUpdate from "./PersonageListUpdate";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import WriterListAdd from "./WriterListAdd";
import WriterListUpdate from "./WriterListUpdate";
const PersonageList = ({ admin }) => {
  const [isPersonage, setIsPersonage] = useState("personage");
  const params = useParams();
  const firestore = fire.firestore();
  const [personages, setPersonages] = useState([]);
  const [writer, setWriter] = useState([]);

  useEffect(() => {
    getPersonage();
    getWriter();
  }, []);

  const getPersonage = async () => {
    const querySnapshot = await firestore
      .collection(`messages/${params.id}/personage`)
      .get();

    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setPersonages(list);
  };

  const getWriter = async () => {
    const querySnapshot = await firestore
      .collection(`messages/${params.id}/writer`)
      .get();

    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setWriter(list);
  };

  const deletePersonage = async (id) => {
    const res = await firestore
      .collection("messages")
      .doc(params.id)
      .collection("personage")
      .doc(id)
      .delete()
      .then(() => {
        console.log("successfully deleted");
        getPersonage();
      });
  };
  const deleteWriter = async (id) => {
    const res = await firestore
      .collection("messages")
      .doc(params.id)
      .collection("writer")
      .doc(id)
      .delete()
      .then(() => {
        console.log("successfully deleted");
        getPersonage();
      });
  };

  console.log(personages);
  console.log(writer);
  // if (personages.length === 0 && writer.length === 0) {
  //   <>loading...</>;
  // }

  return (
    <div className="Details-btm-left_box-child1-info5">
      <div className="Details-btm-left_box-child1-info5-child1 color-opacity">
        <div
          onClick={() => setIsPersonage("personage")}
          className={
            isPersonage === "personage"
              ? "info5-child1-active"
              : "info5-child1-disactive"
          }
        >
          Персонажи
        </div>
        <div
          onClick={() => setIsPersonage("writer")}
          className={
            isPersonage === "writer"
              ? "info5-child1-active"
              : "info5-child1-disactive"
          }
        >
          Создатели
        </div>
        {/* <div
          onClick={() => setIsPersonage("add")}
          className={
            isPersonage === "add"
              ? "info5-child1-active"
              : "info5-child1-disactive"
          }
        ></div> */}

        {isPersonage === "personage" ? (
          <div className="color-opacity child1-info5-add">
            {admin && <PersonageListAdd getPersonage={getPersonage} />}
          </div>
        ) : (
          <div className="color-opacity child1-info5-add">
            {admin && <WriterListAdd getPersonage={getPersonage} />}
          </div>
        )}
      </div>

      <div className="Details-btm-left_box-child1-info5-child2">
        {isPersonage === "personage" ? (
          <>
            {personages.map((item) => (
              <div className="child1-info5-img">
                <img src={item.personage} alt="" />
                <div className="color-opacity">{item.name}</div>
                {admin && (
                  <div className="color-opacity child1-info5-edit">
                    <PersonageListUpdate
                      style={{ display: admin ? "block" : "none" }}
                      item={item}
                      getPersonage={getPersonage}
                    />
                    <div
                      onClick={() => deletePersonage(item.id)}
                      className="color-opacity child1-info5-delete"
                    >
                      <RestoreFromTrashIcon
                        style={{ display: admin ? "block" : "none" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {writer.map((item) => (
              <div className="child1-info5-img">
                <img src={item.writer} alt="" />
                <div className="color-opacity">{item.name}</div>

                {admin && (
                  <div className="color-opacity child1-info5-edit">
                    <WriterListUpdate item={item} getWriter={getWriter} />
                    <div
                      onClick={() => deleteWriter(item.id)}
                      className="color-opacity child1-info5-delete"
                    >
                      <RestoreFromTrashIcon />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PersonageList;
