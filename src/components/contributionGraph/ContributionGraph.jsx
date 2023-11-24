import "./styles.scss";
import { dateData } from "../date";
import { useState } from "react";

const ContributionGraph = ({ data }) => {
  const [messageDay, setMessageDay] = useState({});
  const [messageDayVisibility, setMessageDayVisibility] = useState(false);

  const weekVariant = {
    0: "Понедельник",
    1: "Вторник",
    2: "Среда",
    3: "Четверг",
    4: "Пятница",
    5: "Суббота",
    6: "Воскресенье",
  };

  const monthVariant = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  };

  const contributionValues = {
    noContribution: 0,
    oneToNineContribution: 9,
    tenToNineteenContribution: 19,
    twentyToTwentyNine: 29,
    overThirty: 30,
  };

  const contributionColor = {
    noContribution: "#ededed",
    oneToNineContribution: "#acd5f5",
    tenToNineteenContribution: "#7fa8c9",
    twentyToTwentyNine: "#527ba0",
    overThirty: "#254e77",
  };

  const weekDayRows = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"];

  const dataList = Object.entries(data);
  const dates = Object.entries(dateData);
  const newDateList = dataList.concat(dates);
  console.log("newDataList: ", newDateList);

  const newFormatDateList = newDateList?.map(([date, value]) => {
    const sortDate = new Date(date);
    const year = sortDate.getFullYear();
    const month = sortDate.getMonth() + 1;
    const day = sortDate.getDate();
    const dayOfWeek = sortDate.getDay();

    return {
      year,
      month,
      day,
      dayOfWeek,
      date,
      value,
    };
  });
  console.log("newFormatDateList: ", newFormatDateList);

  const handleGetDate = (day) => {
    setMessageDay(day);
    setMessageDayVisibility(true);
  };

  return (
    <>
      <div className="shared-graph-container">
        <div className="graph-week-days-container">
          {weekDayRows?.map((day) => (
            <p className="week-days">{day}</p>
          ))}
        </div>
        <div className="graph-container">
          {newFormatDateList?.map((day, index) => (
            <div
              key={index}
              onClick={() => handleGetDate(day)}
              className="graph-box"
              style={{
                backgroundColor:
                  day.value === contributionValues.noContribution
                    ? contributionColor.noContribution
                    : day.value > contributionValues.noContribution &&
                      day.value <= contributionValues.oneToNineContribution
                    ? contributionColor.oneToNineContribution
                    : day.value > contributionValues.oneToNineContribution &&
                      day.value <= contributionValues.tenToNineteenContribution
                    ? contributionColor.tenToNineteenContribution
                    : day.value >
                        contributionValues.tenToNineteenContribution &&
                      day.value <= contributionValues.twentyToTwentyNine
                    ? contributionColor.twentyToTwentyNine
                    : day.value > contributionValues.overThirty
                    ? contributionColor.overThirty
                    : "#000",
              }}
            ></div>
          ))}

          <div
            className="tooltip-message"
            style={
              messageDayVisibility
                ? {
                    display: "flex",
                    // left: coordX + "px",
                    // top: coordY + "px",
                  }
                : { display: "none" }
            }
          >
            <div className="tooltip-message-value">
              {messageDay.value || 0} Countributions
            </div>
            <div>
              {weekVariant[messageDay.dayOfWeek] || "Не задано"},{" "}
              {monthVariant[messageDay.month] || "Не задано"}{" "}
              {messageDay.day || "Не задано"}, {messageDay.year || "Не задано"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributionGraph;
