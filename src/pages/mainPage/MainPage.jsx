import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContributionGraph from "../../components/contributionGraph/ContributionGraph";
import { getContributionsList } from "../../reducers/graphPageSlice";
import "./styles.scss";

const MainPage = () => {
  const data = useSelector((state) => state.graphPageStore.data);
  console.log("data: ", data);

  const dispatch = useDispatch();

  const monthColumns = [
    "Апр.",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек.",
    "Янв.",
    "Фев.",
    "Март",
  ];

  const handleGetContributionsList = useCallback(async () => {
    await dispatch(getContributionsList());
  }, [dispatch]);

  useEffect(() => {
    handleGetContributionsList();
  }, [handleGetContributionsList]);

  return (
    <div className="main-page-container">
      <div className="graph-contribution-container">
        <div className="graph-month-container">
          {monthColumns?.map((month) => (
            <p>{month}</p>
          ))}
        </div>

        <ContributionGraph data={data} />
      </div>
    </div>
  );
};

export default MainPage;
