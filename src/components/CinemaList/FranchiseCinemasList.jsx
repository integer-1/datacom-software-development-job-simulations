import BaseCinemaList from "./BaseCinemaList";
import FranchiseHeader from "./FranchiseHeader";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../../data/cinemas";

const FranchiseCinemasList = () => {
  const { franchiseId, countryCode } = useParams();
  const filteredCinemas = useMemo(() => {
    return allCinemas.filter(cinema => (
      franchiseId === 'all-cinemas' ||
      cinema.franchise === franchiseId
    ) && cinema.countryCode === countryCode);
  }, [franchiseId, countryCode])

  return (
    <BaseCinemaList cinemas={filteredCinemas} Header={FranchiseHeader} />
  );
};
export default FranchiseCinemasList;