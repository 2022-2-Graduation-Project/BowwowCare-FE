import React from "react";
import { behaviorType, colorVariants } from "../../../utils/Dictionary";

function ButtonGroups({
  behaviors,
  selectedBehaviors,
  setSelectedBehaviors,
  abnormal,
}) {
  const handleSelected = (behavior) => (e) => {
    if (!abnormal) {
      let arr = [...selectedBehaviors];
      let obj = arr[behavior.aggressionId - 1];
      obj.isDeleted = !obj.isDeleted;
      arr[behavior.aggressionId - 1] = obj;

      setSelectedBehaviors(arr);
    }
  };

  return (
    <div className="shadow-md rounded-md p-3">
      {behaviors?.map((behavior) => (
        <span key={behavior?.aggressionId}>
          <div
            className={
              abnormal && (behavior?.aggressionId - 1) % 4 === 0
                ? "block"
                : "hidden"
            }
          >
            <span
              className={`text-sm font-bold ml-2 ${
                colorVariants["text" + behavior?.aggressionType]
              }`}
            >
              {behaviorType[behavior?.aggressionType]}
            </span>
          </div>
          <button
            className={`px-4 py-1 m-1 border-2 rounded-md ${
              colorVariants["border" + behavior?.aggressionType]
            } ${
              selectedBehaviors[behavior.aggressionId - 1]?.isDeleted === false
                ? colorVariants["bg" + behavior?.aggressionType] + " text-white"
                : null
            }`}
            onClick={handleSelected(behavior)}
          >
            <span>{behavior?.content}</span>
          </button>
          <div
            className={behavior?.aggressionId % 4 === 0 ? "block" : "hidden"}
          />
        </span>
      ))}
    </div>
  );
}

export default ButtonGroups;
