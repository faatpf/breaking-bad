import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useFetch } from "../../utils/useFetch";
import { Characters } from "../../utils/types";
import "./style.css";

/**
 * @interface HomePageProps  HomePage Props
 */
interface HomePageProps {}
/**
 * @name HomePage
 * @description HomePage component
 * @param props
 */

const dropDownOption = ["name", "nickname", "birthday"];

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const [filter, setFilter] = useState<string>(null);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrderAscending, setSortOrderAscending] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [characters, error, loading] = useFetch<Array<Characters>>(
    `https://www.breakingbadapi.com/api/characters${
      filter ? `?name=${filter}` : ""
    }`,
    "GET",
    [filter]
  );

  /**
   * @function sortByName
   * @description Sort characters by character name
   */
  const sortByName = () => {
    const newData = [...data];

    newData.sort((a, b) => {
      const nameA = a[sortBy].toUpperCase();
      const nameB = b[sortBy].toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    if (!sortOrderAscending) newData.reverse();
    setData(newData);
  };

  /**
   * @function sortByBirthDay
   * @description Sort characters by character birthday
   */
  const sortByBirthDay = () => {
    const characterWithBirthDay = data.filter(
      (data) => !isNaN(new Date(data.birthday).getDate())
    );

    const characterWithoutBirthDay = data.filter((data) =>
      isNaN(new Date(data.birthday).getDate())
    );

    characterWithBirthDay.sort((a, b) => {
      if (new Date(a.birthday) < new Date(b.birthday)) return -1;
      if (new Date(a.birthday) > new Date(b.birthday)) return 1;
      return 0;
    });

    if (!sortOrderAscending) characterWithBirthDay.reverse();
    const newData = [...characterWithBirthDay, ...characterWithoutBirthDay];
    setData(newData);
  };

  /**
   * @function sortCharacters
   * @description Specifies how  characters sort
   */
  const sortCharacters = () => {
    if (sortBy !== "birthday") sortByName();
    if (sortBy === "birthday") sortByBirthDay();
  };

  useEffect(() => {
    if (data && !loading && !error) sortCharacters();
  }, [sortBy, sortOrderAscending]);

  useEffect(() => {
    if (!loading && !error) setData(characters);
  }, [characters]);

  /**
   * @function handleClickBtn
   * @description Specifies whether the sort is descending or ascending
   */
  const handleClickBtn = () => {
    setSortOrderAscending((pre) => !pre);
  };

  return (
    <div className="breaking-bad-home">
      <h1 className="breaking-bad-home__heading">Breaking Bad Series Characters</h1>

      <TextInput
        onChange={debounce((e) => {
          const target = e.target as HTMLInputElement;
          setFilter(target.value);
        }, 1000)}
        placeholder="name"
        className="breaking-bad-home__input"
        label="Search Charater Name:"
      />

      <div className="breaking-bad-home__sort">
        <DropDown
          options={dropDownOption}
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          label="Sort With:"
          className="breaking-bad-home__drop-down"
        />
        <Button
          title={sortOrderAscending ? "Descending" : "Ascending"}
          onClick={handleClickBtn}
        />
      </div>

      {loading && <Loader containerClassName="breaking-bad-home__loader" />}

      {error && (
        <div className="breaking-bad-home__error">
          {"Oops! an error has occurred."}
        </div>
      )}

      {data.length === 0 && !loading && (
        <div className="breaking-bad-home__error">{"No character found"}</div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="breaking-bad-home__characters">
          {data.map((character) => (
            <Link
              to="/quotes"
              state={{ name: character.name }}
              key={character.char_id}
            >
              <Card
                src={character.img}
                description={[
                  character.name,
                  character.nickname,
                  character.birthday,
                  character.status,
                ]}
                className="breaking-bad-home__card"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
