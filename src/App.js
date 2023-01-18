import React from "react";
import { useState } from "react";
import "./style.css";

// , img: "../public/icon/ru"
function App() {
  const [isActive, setIsActive] = useState(false);
  const [checkboxs, setCheckboxs] = useState([
    { id: 1, name: "Русский", img: "ru.svg", chek: true },
    { id: 2, name: "Английский", img: "en.svg", chek: false },
    { id: 3, name: "Испанский", img: "is.svg", chek: false },
    { id: 4, name: "Немецкий", img: "ga.svg", chek: false },
    { id: 5, name: "Итальянский", img: "it.svg", chek: false },
    { id: 6, name: "Польский", img: "po.svg", chek: false },
  ]);

  const [value, setValue] = useState("");

  const filteredLang = checkboxs.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleChangeCheckboxs = (id) => {
    setCheckboxs((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  };

  const renderFilters = () => {
    return checkboxs.map((item) => {
      if (item.check) {
        return (
          <span
            onClick={() => handleChangeCheckboxs(item.id)}
            className="option"
            key={item.id}
          >
            {item.name}☓
          </span>
        );
      } else {
        return null;
      }
    });
  };

  const renderCheckboxs = () => {
    return filteredLang.map((item) => (
      <div className="box">
        <div className="language" key={item.id}>
          <img className="icon" src={"img/" + item.img} alt="" />

          <label>{item.name}</label>
          <div
            className="languageInput"
            onClick={() => handleChangeCheckboxs(item.id)}
          >
            <input type="checkbox" id={item.id} />
            {item.check && (
              <>
                <div className="languageInputBefore"></div>
                <div className="languageInputAfter">✓</div>
              </>
            )}
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="App">
      <div className="dropdown">
        <span>Язык</span>

        <div className="filters">
          <div className="filter">
            {renderFilters()}
            {checkboxs.some((item) => item.check) ? null : (
              <p>Выберите язык... </p>
            )}
          </div>
          <span onClick={(e) => setIsActive(!isActive)}>▼</span>
        </div>

        {isActive && (
          <div className="languages">
            <div className="serach_bar">
              <label for="search-box" class="fas fa-search"></label>
              <input
                id="search-box"
                className="search"
                type="search"
                placeholder="Поиск"
                onChange={(event) => setValue(event.target.value)}
              />
            </div>
            {renderCheckboxs()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
