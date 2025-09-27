import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiUser, FiMail, FiKey, FiAward, FiCalendar, FiSearch, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useAuthContext } from '../../../contexts/Auth';

const UserDetail = () => {
    const { getAllUser } = useAuthContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const filteredAndSortedUsers = useMemo(() => {
        if (!Array.isArray(getAllUser)) return [];

        let users = [...getAllUser];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            users = users.filter(user =>
                user.fullName?.toLowerCase().includes(term) ||
                user.email?.toLowerCase().includes(term) ||
                user.role?.toLowerCase().includes(term)
            );
        }

        if (sortConfig.key) {
            users.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'createdAt') {
                    try {
                        if (aValue?.toDate) aValue = aValue.toDate().getTime();
                        else if (aValue?.seconds) aValue = aValue.seconds * 1000;
                        else if (aValue instanceof Date) aValue = aValue.getTime();
                        else aValue = new Date(aValue).getTime();

                        if (bValue?.toDate) bValue = bValue.toDate().getTime();
                        else if (bValue?.seconds) bValue = bValue.seconds * 1000;
                        else if (bValue instanceof Date) bValue = bValue.getTime();
                        else bValue = new Date(bValue).getTime();
                    } catch (e) {
                        console.error('Date comparison error', e);
                        return 0;
                    }
                }

                // Handle undefined values
                if (aValue === undefined || aValue === null) return 1;
                if (bValue === undefined || bValue === null) return -1;

                // String comparison for text fields
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'ascending'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                // Numeric/date comparison
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return users;
    }, [getAllUser, searchTerm, sortConfig]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortConfig]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    // Sorting handler
    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => {
            if (prevConfig.key === key) {
                return {
                    key,
                    direction: prevConfig.direction === 'ascending'
                        ? 'descending'
                        : 'ascending'
                };
            }
            return { key, direction: 'ascending' };
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <FiUser className="text-gray-900 text-xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                            User Management
                        </h2>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
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
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('id')}
                                        >
                                            <span>ID</span>
                                            {sortConfig.key === 'id' && (
                                                <span>{sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('fullName')}
                                        >
                                            <FiUser className="text-purple-500" />
                                            <span>Name</span>
                                            {sortConfig.key === 'fullName' && (
                                                <span>{sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('email')}
                                        >
                                            <FiMail className="text-purple-500" />
                                            <span>Email</span>
                                            {sortConfig.key === 'email' && (
                                                <span>{sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <div className="flex items-center gap-1">
                                            <FiKey className="text-purple-500" />
                                            <span>User ID</span>
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('role')}
                                        >
                                            <FiAward className="text-purple-500" />
                                            <span>Role</span>
                                            {sortConfig.key === 'role' && (
                                                <span>{sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('createdAt')}
                                        >
                                            <FiCalendar className="text-purple-500" />
                                            <span>Join Date</span>
                                            {sortConfig.key === 'createdAt' && (
                                                <span>{sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />}</span>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-700 transition-all duration-200 hover:bg-gray-700 hover:bg-opacity-50"
                                    >
                                        <td className="py-4 px-6 text-gray-300">
                                            <span className="bg-gray-900 px-3 py-1 rounded-full text-sm">#{user.id}</span>
                                        </td>
                                        <td className="py-4 px-6 font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gray-900 p-2 rounded-full">
                                                    <FiUser className="text-purple-500" />
                                                </div>
                                                <span>{user.fullName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            <a href={`mailto:${user.email}`} className="hover:text-purple-400 transition-colors">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300 text-sm font-mono">{user.uid}</td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${user.role === 'admin'
                                                        ? 'bg-purple-900 text-purple-300'
                                                        : user.role === 'editor'
                                                            ? 'bg-blue-900 text-blue-300'
                                                            : 'bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            {user.createdAt?.toDate().toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAndSortedUsers.length === 0 && (
                        <div className="py-12 text-center text-gray-400">
                            <div className="text-5xl mb-4">👤</div>
                            <p className="text-xl">No users found</p>
                            <p className="mt-2">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400">
                        Showing {indexOfFirstUser + 1}-
                        {Math.min(indexOfLastUser, filteredAndSortedUsers.length)} of{' '}
                        {filteredAndSortedUsers.length} users
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

export default UserDetail;