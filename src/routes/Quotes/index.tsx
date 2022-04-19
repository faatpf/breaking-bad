import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useFetch } from "../../utils/useFetch";
import { CharacterQuote } from "../../utils/types";
import "./style.css";

/**
 * @interface QuotesProps  Quotes Props
 */
interface QuotesProps {}

/**
 * @name Quotes
 * @description Quotes component
 * @param props
 */

const Quotes: React.FC<QuotesProps> = (props: QuotesProps) => {
  const location = useLocation();
  const state = location.state as any;
  const characterName = state.name;
  const [newQuote, setNewQuotes] = useState<boolean>(false);
  
  const [quote, error, loading] = useFetch<Array<CharacterQuote>>(
    `https://www.breakingbadapi.com/api/quote/random?author=${characterName}`,
    "GET",
    [newQuote]
  );

  return (
    <div className="breaking-bad-quotes">
      <h1 className="breaking-bad-quotes__heading">{`Quote from ${characterName}`}</h1>

      {loading && <Loader />}

      {error && (
        <div className="breaking-bad-quotes__error">
          {"Oops! an error has occurred."}
        </div>
      )}

      {quote.length === 0 && (
        <div className="breaking-bad-home__error">{`No quote found from ${characterName}`}</div>
      )}

      {!loading && !error && quote.length > 0 && (
        <Card
          description={[quote[0]?.quote]}
          className="breaking-bad-quotes__card"
        />
      )}

      <Button
        title={`Another Quote`}
        onClick={() => setNewQuotes((pre) => !pre)}
        containerClassName="breaking-bad-quotes__btn"
      />
    </div>
  );
};

export default Quotes;
