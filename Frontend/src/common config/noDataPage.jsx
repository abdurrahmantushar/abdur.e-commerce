import React from "react";
import { MdOutlineInbox } from "react-icons/md";

function NoDataPage({
  title = "No Data Found",
  description = "There is no data available right now.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      
      {/* Icon */}
      <div className="mb-4">
        <MdOutlineInbox className="text-6xl text-gray-400" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm max-w-sm">
        {description}
      </p>

    </div>
  );
}

export default NoDataPage;
