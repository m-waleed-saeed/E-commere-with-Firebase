import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";
import { useCartContext } from "../../contexts/Cart";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, isAuth, handleLogout } = useAuthContext();
    const { cartItems } = useCartContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef(null);
    const location = useLocation();

    console.log('user', user)
    // Auto-focus search input on mobile
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = (
        <>
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/shop" active={location.pathname.startsWith("/shop")}>Shop</NavLink>
            {!isAuth && (
                <>
                    <NavLink to="/auth/register" active={location.pathname === "/auth/register"}>Register</NavLink>
                    <NavLink to="/auth/login" active={location.pathname === "/auth/login"}>Login</NavLink>
                </>
            )}
            {user?.role === "user" && (
                <NavLink to="/user-dashboard" active={location.pathname.startsWith("/user-dashboard")}>
                    <div className="flex items-center gap-1">
                        <FiUser className="text-base" />
                        <span>{user.fullName.split(' ')[0]}</span>
                    </div>
                </NavLink>
            )}
            {user?.role === "admin" && (
                <NavLink to="/dashboard/orders" active={location.pathname.startsWith("/dashboard")}>
                    <div className="flex items-center gap-1">
                        <FiUser className="text-base" />
                        <span>Admin</span>
                    </div>
                </NavLink>
            )}
            <NavLink to="/favorites" active={location.pathname === "/favorites"}>
                <div className="flex items-center gap-1">
                    <FiHeart className="text-base" />
                    <span>Favorites</span>
                </div>
            </NavLink>
        </>
    );

    return (
        <nav
            className={`w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#121212]" : "bg-[#121212]/90 backdrop-blur-sm"
                } shadow-lg`}
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="text-2xl font-bold no-underline flex items-center" 
                        style={{ textDecoration: 'none' }}>
                        <motion.span 
                            className="text-[#BB86FC]"
                            whileHover={{ scale: 1.05 }}>E-</motion.span>
                        <span className="text-white me-5">Commerce</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8" style={{ textDecoration: 'none' }}>
                        <div className="flex gap-8 no-underline">{navLinks}</div>
                        <div className="flex items-center gap-6 ml-2">
                            <SearchBar inputRef={searchInputRef} />
                            <CartIndicator items={cartItems} />
                            {isAuth && <LogoutButton onClick={handleLogout} />}
                        </div>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-4">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="text-white p-2 hover:text-[#BB86FC] transition-colors"
                            aria-label="Search"
                        >
                            <FiSearch className="text-xl" />
                        </button>
                        <CartIndicator items={cartItems} mobile={true} />
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white p-2 hover:text-[#BB86FC] transition-colors"
                            aria-label="Menu"
                        >
                            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden mt-3"
                    >
                        <SearchBar fullWidth inputRef={searchInputRef} />
                    </motion.div>
                )}

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-5 py-5">
                                {navLinks}
                                <div className="pt-3">
                                    {isAuth && <MobileLogoutButton onClick={handleLogout} />}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

// Reusable Components
const NavLink = ({ to, children, active }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="flex">
        <Link
            to={to}
            className={`flex items-center gap-1 no-underline font-medium transition-colors ${
                active 
                    ? "text-[#BB86FC] font-semibold" 
                    : "text-white hover:text-[#BB86FC]"
            }`}
        >
            {children}
        </Link>
    </motion.div>
);

const CartIndicator = ({ items, mobile }) => (
    <motion.div 
        whileHover={{ scale: 1.1 }} 
        className={`relative ${mobile ? "mr-2" : ""}`}
    >
        <Link to="/cart" className="flex items-center gap-1 no-underline">
            <FiShoppingCart className={`text-xl ${mobile ? "text-white" : "text-white"}`} />
            <motion.span
                key={items.length}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="bg-[#BB86FC] text-[#121212] rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
                {items.length}
            </motion.span>
        </Link>
    </motion.div>
);

const LogoutButton = ({ onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-[#BB86FC] text-[#121212] px-4 py-2 rounded-md no-underline font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
    >
        <FiLogOut className="text-base" />
        <span>Logout</span>
    </motion.button>
);

const MobileLogoutButton = ({ onClick }) => (
    <motion.button
        whileHover={{ backgroundColor: "#2D2D2D" }}
        onClick={onClick}
        className="w-full bg-[#1E1E1E] text-white px-4 py-3 rounded-md no-underline font-medium flex items-center justify-center gap-2"
    >
        <FiLogOut className="text-base" />
        <span>Logout</span>
    </motion.button>
);

const SearchBar = ({ fullWidth, inputRef }) => {
    const { getAllProduct } = useAuthContext();
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const filteredProducts = getAllProduct
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 8);

    return (
        <div
            className={`relative ${fullWidth ? "w-full" : "w-64"}`}
            ref={dropdownRef}
        >
            <div className="flex items-center bg-[#1E1E1E] rounded-lg px-3 py-2.5 border border-[#2D2D2D] hover:border-[#BB86FC] transition-colors">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="text-gray-400 hover:text-white"
                    >
                        <FiX />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isFocused && search && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute mt-2 w-full bg-[#1E1E1E] rounded-lg shadow-xl z-50 overflow-hidden border border-[#2D2D2D]"
                    >
                        {filteredProducts.length > 0 ? (
                            <div className="divide-y divide-[#2D2D2D]">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ backgroundColor: "#2D2D2D" }}
                                        onClick={() => navigate(`/product-info/${product.id}`)}
                                        className="px-4 py-3 cursor-pointer flex items-center gap-3"
                                    >
                                        <img
                                            src={product.imageURL}
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <div>
                                            <p className="text-white">{product.name}</p>
                                            <p className="text-[#BB86FC] text-sm">
                                                ${product.price?.toFixed(2)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-400">
                                No products found
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;