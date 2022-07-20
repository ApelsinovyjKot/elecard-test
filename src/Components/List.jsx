import React, { useEffect, useState } from "react";
import { getName } from "../utils";

const List = ({ data, onImageClick }) => {
  const [categories, setCategories] = useState([]);
  const [listByCategories, setListByCategories] = useState([]);

  useEffect(() => {
    if (!data) return;
    getCategories(data);
    getListByCategories(data);
  }, [data]);

  const getCategories = (arr) => {
    const categories = [];

    arr[0].category &&
      categories.push({ category: arr[0].category, state: false });

    for (let i = 0; i < arr.length; i++) {
      let hasValue = false;
      for (let j = 0; j < categories.length; j++) {
        if (categories[j].category === arr[i].category) {
          hasValue = true;
          break;
        }
      }

      if (!hasValue)
        categories.push({ category: arr[i].category, state: false });
    }
    setCategories(categories);
  };
  const openCategory = (category) => {
    let cat = [...categories];
    cat.forEach((item) => {
      if (item.category === category) {
        item.state = !item.state;
      }
    });

    setCategories(cat);
  };

  const getListByCategories = (arr) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (obj.hasOwnProperty(arr[i].category)) {
        obj[arr[i].category].push(arr[i]);
      } else {
        obj[arr[i].category] = [arr[i]];
      }
    }
    setListByCategories(obj);
  };

  const [rootOpened, setRootOpened] = useState(false);
  return (
    <div>
      <div
        className="root-list-title"
        onClick={() => setRootOpened(!rootOpened)}
      >
        Категории
      </div>
      {rootOpened &&
        categories.map((cat, index) => {
          return (
            <div key={index} className="list">
              <div className="category-list">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => openCategory(cat.category)}
                >
                  {cat.category}
                </div>
              </div>
              {cat.state &&
                listByCategories[cat.category].map((item, index) => {
                  return (
                    <div className="list-by-category" key={index}>
                      <img
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          border: "1px solid #ddd",
                        }}
                        src={`http://contest.elecard.ru/frontend_data/${item.image}`}
                        alt=""
                        onClick={() => onImageClick(item.image)}
                      />
                      <div className="image-name">{getName(item)}</div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default List;
