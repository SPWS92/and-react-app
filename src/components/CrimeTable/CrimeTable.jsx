import React from "react";
import { useAppContext } from "../../context/AppContext";

const CrimeTable = () => {
  const { crimeData } = useAppContext();

  return (
    <div className="h-screen p-5 justify-center">
      {crimeData.length > 0 ? (
        <div className="flex flex-col">
          <span className="font-semibold">{`Showing ${crimeData.length} ${
            crimeData.length > 1 ? "records" : "record"
          }`}</span>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium w-1/3 text-gray-700 uppercase tracking-wider"
                      >
                        Crime Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium w-1/3 text-gray-700 uppercase tracking-wider"
                      >
                        Outcome Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium w-1/3 text-gray-700 uppercase tracking-wider"
                      >
                        Month
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crimeData.map(crime => (
                      <tr key={crime.id}>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {crime.category}
                              </div>
                              <div className="text-sm text-gray-500">
                                {crime.location.street.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {crime.outcome_status?.category ||
                              "No outcome status available"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {`Resolution date: ${
                              crime.outcome_status?.date || "-"
                            }`}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-500">
                            {crime.month}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span className="flex justify-center">No crimes reported</span>
      )}
    </div>
  );
};

export default CrimeTable;
