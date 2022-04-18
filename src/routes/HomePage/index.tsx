import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import Card from "src/components/Card";
import TextInput from "src/components/TextInput";
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
const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const [filter, setFilter] = useState<string>(null);

  const [characters, error, loading] = useFetch<Characters>(
    `https://www.breakingbadapi.com/api/characters${
      filter ? `?name=${filter}` : ""
    }`,
    "GET",
    [filter]
  );

  useEffect(() => {
    if (/\s/g.test(filter)) {
      const filterWithSpace = filter.split(" ").join("+");
      setFilter(filterWithSpace);
    }
  }, [filter]);

  return (
    <div className="breaking-bad-home">
      <TextInput
        onChange={debounce((e) => {
          const target = e.target as HTMLInputElement;
          setFilter(target.value);
        }, 1000)}
        placeholder="search character with name"
      />
      {loading && <div>loading ...</div>}
      {!loading &&
        characters &&
        characters.map((character) => (
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
