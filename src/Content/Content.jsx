import React, { useEffect, useState } from "react";
import "./ContentStyle.css";
import ImageModal from "../Modal/Modal";
import ViewSwitcher from "../Components/ViewSwitcher";
import SortSwitcher from "../Components/SortSwitcher";
import CardList from "../Components/CardList";
import { sortByCategory, sortbyDate, sortByName, sortbySize } from "../utils";
import List from "../Components/List";
import { CircularProgress } from "@mui/material";

const Content = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://contest.elecard.ru/frontend_data/catalog.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((element, index) => {
          element.id = index;
        });
        setData(data);
        setLoading(false);
      });
  }, []);

  const [viewType, setViewType] = React.useState("card");
  const changeViewType = (event) => {
    setViewType(event.target.value);
  };

  const [sortType, setSortType] = React.useState("date");
  const changeSortType = (event) => {
    setSortType(event.target.value);
    let sortedData = [];
    switch (event.target.value) {
      case "name":
        sortedData = [...sortByName(data)];
        break;
      case "category":
        sortedData = [...sortByCategory(data)];
        break;
      case "date":
        sortedData = [...sortbyDate(data)];
        break;
      case "size":
        sortedData = [...sortbySize(data)];
        break;
      default:
        break;
    }
    setData(sortedData);
  };

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageName, setImageName] = useState("");

  return (
    <div className="content">
      <div style={{ paddingLeft: 35 }}>
        <ViewSwitcher value={viewType} onChange={changeViewType} />
        <SortSwitcher value={sortType} onChange={changeSortType} />
      </div>
      {loading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress size={50} />
        </div>
      ) : viewType === "card" ? (
        <CardList data={data} />
      ) : (
        <>
          <List
            data={data}
            onImageClick={(imageName) => {
              setImageName(imageName);
              setIsModalOpened(true);
            }}
          />
          <ImageModal
            visible={isModalOpened}
            name={imageName}
            closeCallback={() => {
              setIsModalOpened(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Content;
