import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "src/components/Card";
import Button from "src/components/Button";
import { useFetch } from "src/utils/useFetch";
import { CharacterQuote } from "src/utils/types";

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
      {loading && <div>loading ...</div>}
      {!loading && !error && <Card description={[quote[0]?.quote]} />}
      <Button
        title={`Another quote from ${characterName}`}
        onClick={() => setNewQuotes((pre) => !pre)}
      />
    </div>
  );
};

export default Quotes;
