import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

function ExpandablePanel({ header, children }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="mb-4 border border rounded bg-gray-100 ">
            <div className="flex p-2 justify-between items-center">
                <div className="flex flex-row items-center justify-between">
                    {header}
                </div>
                <div onClick={handleClick} className="cursor-pointer">
                    {expanded ? <GoChevronDown /> : <GoChevronRight />}
                </div>
            </div>
            {/* if expanded is true, show div */}
            {expanded && <div className="p-2 border-t">{children}</div>}
        </div>
    );
}

export default ExpandablePanel;
