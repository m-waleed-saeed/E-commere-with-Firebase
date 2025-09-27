import React, { useState, useMemo, useEffect } from "react";
import { FiMail, FiSearch, FiChevronUp, FiChevronDown, FiUser } from "react-icons/fi";
import { useNewsLetter } from "../../../contexts/NewsLetter";
import ScreenLoader from "../../../components/ScreenLoader"; // Make sure this path is correct

const NewsLetterList = () => {
  const { subscribers, isLoading } = useNewsLetter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 10;

  // Process subscribers for display
  const processedSubscribers = useMemo(() => {
    if (!Array.isArray(subscribers)) return [];
    
    return subscribers.map(sub => ({
      ...sub,
      createdAtDate: sub.createdAt?.seconds 
        ? new Date(sub.createdAt.seconds * 1000) 
        : null
    }));
  }, [subscribers]);

  // Filter and sort subscribers
  const filteredAndSortedSubscribers = useMemo(() => {
    let subs = [...processedSubscribers];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      subs = subs.filter(sub => 
        sub.email?.toLowerCase().includes(term) ||
        sub.name?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      subs.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for dates
        if (sortConfig.key === 'createdAt') {
          aValue = a.createdAt?.seconds || 0;
          bValue = b.createdAt?.seconds || 0;
        }

        // Handle undefined values
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        // String comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Numeric/date comparison
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return subs;
  }, [processedSubscribers, searchTerm, sortConfig]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // Pagination
  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = filteredAndSortedSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);
  const totalPages = Math.ceil(filteredAndSortedSubscribers.length / subscribersPerPage);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'ascending' 
          ? 'descending' 
          : 'ascending'
    }));
  };

  if (isLoading) return <ScreenLoader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <FiMail className="text-gray-900 text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              Newsletter Subscribers
            </h2>
          </div>

          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-4 px-6 text-left">ID</th>
                  <th className="py-4 px-6 text-left">
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('email')}
                    >
                      <FiMail className="text-purple-500" />
                      <span>Email</span>
                      {sortConfig.key === 'email' && (
                        sortConfig.direction === 'ascending' 
                          ? <FiChevronUp /> 
                          : <FiChevronDown />
                      )}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <FiUser className="text-purple-500" />
                      <span>Name</span>
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'ascending' 
                          ? <FiChevronUp /> 
                          : <FiChevronDown />
                      )}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <span>Subscribed On</span>
                      {sortConfig.key === 'createdAt' && (
                        sortConfig.direction === 'ascending' 
                          ? <FiChevronUp /> 
                          : <FiChevronDown />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSubscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber.id}
                    className="border-t border-gray-700 transition-all duration-200 hover:bg-gray-700 hover:bg-opacity-50"
                  >
                    <td className="py-4 px-6 text-gray-300">
                      <span className="bg-gray-900 px-3 py-1 rounded-full text-sm">
                        #{indexOfFirstSubscriber + index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      <a 
                        href={`mailto:${subscriber.email}`}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {subscriber.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {subscriber.name || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {subscriber.createdAtDate 
                        ? subscriber.createdAtDate.toLocaleDateString() 
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedSubscribers.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <div className="text-5xl mb-4">✉️</div>
              <p className="text-xl">No subscribers found</p>
              <p className="mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400">
            Showing {indexOfFirstSubscriber + 1}-
            {Math.min(indexOfLastSubscriber, filteredAndSortedSubscribers.length)} of{' '}
            {filteredAndSortedSubscribers.length} subscribers
          </div>

          <div className="flex items-center gap-4">
            <div className="text-gray-400 hidden sm:block">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg transition-all ${currentPage === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                  }`}
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                    ? "bg-purple-900 text-purple-400 cursor-not-allowed opacity-70"
                    : "bg-purple-600 text-white hover:bg-purple-500 hover:scale-[1.03] active:scale-95"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterList;