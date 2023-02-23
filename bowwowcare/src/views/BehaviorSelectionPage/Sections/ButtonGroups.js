import React from 'react'


function ButtonGroups({ behaviors, selectedBehaviors, setSelectedBehaviors, abnormal }) {
    const colors = ["#FFC329", "#FF9029", "#FF1192"];
    const behaviorType = ["행동 준비 단계 : 스트레스 반응", "행동 준비 단계 : 집중하기", "극단적 행동 단계 : 방어준비"];

    const handleSelected = (behavior) => (e) => {
        if (!abnormal) {
            let arr = [...selectedBehaviors];
            let obj = arr[behavior.aggressionId-1];
            obj.isDeleted = !obj.isDeleted;
            arr[behavior.aggressionId-1] = obj;
    
            setSelectedBehaviors(arr);
        }
    }

    return (
        <div className="shadow-md rounded-md p-4">
            {behaviors?.map(behavior =>
                <span key={behavior?.aggressionId}>
                    <div className={abnormal && (behavior?.aggressionId-1) % 4 == 0 ? "block" : "hidden"}>
                        <span className={`text-sm font-bold ml-2 text-[${colors[behavior?.aggressionType]}]`}>{behaviorType[behavior?.aggressionType]}</span>
                    </div>
                    <button 
                        className={`px-4 py-1 m-2 border-2 rounded-md border-[${colors[behavior?.aggressionType]}] ${selectedBehaviors[behavior.aggressionId-1]?.isDeleted===false ? 'bg-['+colors[behavior?.aggressionType]+'] text-white' : null}`}
                        onClick={handleSelected(behavior)}    
                    >
                        <span>{behavior?.content}</span>
                    </button>  
                    <div className={behavior?.aggressionId % 4 === 0 ? "block" : "hidden"} />  
                </span>
            )}
        </div>
    )
}

export default ButtonGroups
