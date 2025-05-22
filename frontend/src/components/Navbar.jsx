import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from "../utils";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Effect untuk mendeteksi scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Yakin ingin logout?",
            text: "Anda akan keluar dari sistem.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, logout",
            cancelButtonText: "Batal"
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem("accessToken");

            try {
                await axios.delete(`${BASE_URL}/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
            } catch (error) {
                console.warn("Logout error:", error?.response?.data || error.message);
            } finally {
                localStorage.removeItem("accessToken");
                delete axios.defaults.headers.common["Authorization"];

                Swal.fire({
                    icon: "success",
                    title: "Logout Berhasil",
                    text: "Anda telah keluar dari sistem.",
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate("/");
            }
        }
    };

    return (
        <nav 
            className={`navbar is-primary has-shadow ${scrolled ? 'is-fixed-top' : ''}`} 
            role="navigation" 
            aria-label="main navigation"
            style={{
                transition: 'all 0.3s ease',
                borderRadius: scrolled ? '0' : '0 0 10px 10px',
                boxShadow: scrolled 
                    ? '0 2px 10px rgba(0, 0, 0, 0.1)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.08)',
                minHeight: '3.8rem',
                paddingTop: '0.3rem',
                paddingBottom: '0.3rem'
            }}
        >
            <div className="container">
                <div className="navbar-brand">
                    <a 
                        className="navbar-item" 
                        style={{ 
                            fontWeight: 700, 
                            letterSpacing: '0.5px',
                            fontSize: '1.8rem',
                            paddingRight: '1.5rem' // Menambah jarak di sebelah kanan logo
                        }}
                    >
                        <i className="fas fa-book-open mr-2"></i>
                        NotesApp
                    </a>
                </div>

                <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-start" style={{ marginLeft: '0.5rem' }}>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                `navbar-item ${isActive ? 'is-active' : ''}`
                            }
                            style={({ isActive }) => ({
                                fontWeight: isActive ? '600' : '400',
                                borderBottom: isActive ? '2px solid white' : 'none',
                                transition: 'all 0.2s ease',
                                borderRadius: '4px',
                                margin: '0 5px',
                                paddingTop: '0.7rem',
                                paddingBottom: '0.7rem'
                            })}
                        >
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-home"></i>
                                </span>
                                <span>Home</span>
                            </span>
                        </NavLink>
                        
                        <NavLink 
                            to="/add" 
                            className={({ isActive }) => 
                                `navbar-item ${isActive ? 'is-active' : ''}`
                            }
                            style={({ isActive }) => ({
                                fontWeight: isActive ? '600' : '400',
                                borderBottom: isActive ? '2px solid white' : 'none',
                                transition: 'all 0.2s ease',
                                borderRadius: '4px',
                                margin: '0 5px',
                                paddingTop: '0.7rem',
                                paddingBottom: '0.7rem'
                            })}
                        >
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span>Tambah Catatan</span>
                            </span>
                        </NavLink>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                            <div className="buttons">
                                <button 
                                    onClick={handleLogout} 
                                    className="button is-danger is-light" 
                                    style={{
                                        borderRadius: '20px',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <span className="icon">
                                        <i className="fas fa-sign-out-alt"></i>
                                    </span>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;