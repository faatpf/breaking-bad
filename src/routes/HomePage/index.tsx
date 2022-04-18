import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import Card from "src/components/Card";
import TextInput from "src/components/TextInput";
import DropDown from "src/components/DropDown";
import Button from "src/components/Button";
import { useFetch } from "../../utils/useFetch";
import { Characters } from "../../utils/types";

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

  const [characters, error, loading] = useFetch<Characters>(
    `https://www.breakingbadapi.com/api/characters${
      filter ? `?name=${filter}` : ""
    }`,
    "GET",
    [filter]
  );

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

  const sortCharacters = () => {
    if (sortBy !== "birthday") sortByName();
    if (sortBy === "birthday") sortByBirthDay();
  };

  useEffect(() => {
    if (data && !loading) sortCharacters();
  }, [sortBy, sortOrderAscending]);

  useEffect(() => {
    if (!loading && !error) setData(characters);
  }, [characters]);

  useEffect(() => {
    if (/\s/g.test(filter)) {
      const filterWithSpace = filter.split(" ").join("+");
      setFilter(filterWithSpace);
    }
  }, [filter]);

  const handleClickBtn = () => {
    setSortOrderAscending((pre) => !pre);
  };

  return (
    <div className="breaking-bad-home">
      <TextInput
        onChange={debounce((e) => {
          const target = e.target as HTMLInputElement;
          setFilter(target.value);
        }, 1000)}
        placeholder="search character with name"
      />
      <DropDown
        options={dropDownOption}
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
      />
      <Button
        title={sortOrderAscending ? "Descending" : "Ascending"}
        onClick={handleClickBtn}
      />
      {loading && <div>loading ...</div>}
      {!loading &&
        !error &&
        data &&
        data.map((character) => (
          <Card
            key={character.char_id}
            src={character.img}
            description={[
              character.name,
              character.nickname,
              character.birthday,
              character.status,
            ]}
          />
        ))}
    </div>
  );
};

export default HomePage;
