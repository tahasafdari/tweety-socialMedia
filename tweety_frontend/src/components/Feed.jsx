import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utility/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { catergoryId } = useParams();
  const [Pins, setPins] = useState(null);
  useEffect(() => {
    setLoading(true);
    if (catergoryId) {
      const query = searchQuery(catergoryId);
      client.fetch(query).the((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [catergoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;
  return <div>{Pins && <MasonryLayout Pins={Pins} />}</div>;
};

export default Feed;
