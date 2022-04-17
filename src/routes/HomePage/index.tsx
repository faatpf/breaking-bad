import React from "react";
import Card from "../../components/Card";
import { useFetch } from "../../utils/useFetch";
import { Characters } from "../../utils/types";

/**
 * @interface HomePageP component HomePage
 */
interface HomePageP {}
/**
 * @name HomePage
 * @description HomePage component
 * @param props
 */
const HomePage: React.FC<HomePageP> = (props: HomePageP) => {
  const [characters, error, loading] = useFetch<Characters>(
    "https://www.breakingbadapi.com/api/characters",
    "GET"
  );

  return (
    <div className="breaking-bad-home">
      {loading && <div>loading ...</div>}
      {!loading &&
        characters &&
        characters.map((character) => (
          <Card
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
