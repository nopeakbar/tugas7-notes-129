import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const EditNote = () => {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("Kuliner");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getNoteById = async () => {
            try {
                // Ambil token dari localStorage
                const token = localStorage.getItem("accessToken");
                
                if (!token) {
                    Swal.fire({
                        title: "Sesi Berakhir!",
                        text: "Sesi anda telah berakhir. Silahkan login kembali.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    navigate("/");
                    return;
                }
                
                // Tambahkan token ke header request
                const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Set data ke state
                setDate(response.data.date ? response.data.date.substring(0, 10) : "");
                setTitle(response.data.title);
                setContent(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching note:", error.response?.data || error.message);
                Swal.fire({
                    title: "Gagal Mengambil Data!",
                    text: error.response?.data?.message || "Terjadi kesalahan saat mengambil data catatan.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                navigate("/dashboard");
            }
        };
        
        getNoteById();
    }, [id, navigate]);

    const updateNote = async (e) => {
        e.preventDefault();
        
        if (!date || !title || !content) {
            Swal.fire({
                title: "Gagal!",
                text: "Semua field harus diisi.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
        
        // Konfirmasi sebelum update
        Swal.fire({
            title: "Yakin ingin memperbarui catatan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Update!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Ambil token dari localStorage
                    const token = localStorage.getItem("accessToken");
                    
                    if (!token) {
                        Swal.fire({
                            title: "Sesi Berakhir!",
                            text: "Sesi anda telah berakhir. Silahkan login kembali.",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                        navigate("/");
                        return;
                    }
                    
                    // Kirim request dengan token otorisasi
                    await axios.put(`${BASE_URL}/notes/${id}`, {
                        date,
                        title,
                        content,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    
                    // Notifikasi sukses
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Catatan berhasil diperbarui.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    
                    // Navigasi ke dashboard setelah berhasil
                    navigate("/dashboard");
                } catch (error) {
                    console.error("Error updating note:", error.response?.data || error.message);
                    
                    // Pesan error yang lebih spesifik
                    const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat memperbarui catatan.";
                    
                    Swal.fire({
                        title: "Gagal!",
                        text: errorMessage,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    return (
        <div className="columns is-centered mt-6">
            <div className="column is-half">
                <div className="box has-shadow p-5" style={{ borderRadius: "12px" }}>
                    <h2 className="title is-4 has-text-centered has-text-primary">
                        Edit Catatan
                    </h2>
                    
                    {loading ? (
                        <div className="has-text-centered my-5">
                            <p className="subtitle">Memuat data...</p>
                        </div>
                    ) : (
                        <form onSubmit={updateNote}>
                            <div className="field">
                                <label className="label has-text-weight-semibold">Tanggal</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input is-rounded"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label has-text-weight-semibold">Kategori</label>
                                <div className="control">
                                    <div className="select is-fullwidth is-rounded">
                                        <select value={title} onChange={(e) => setTitle(e.target.value)}>
                                            <option value="Kuliner">Kuliner</option>
                                            <option value="Transfer">Transfer</option>
                                            <option value="Kuliah">Kuliah</option>
                                            <option value="Notifikasi">Notifikasi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label has-text-weight-semibold">Isi Catatan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input is-rounded"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Masukkan catatan Anda..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field mt-4 is-flex is-justify-content-space-between">
                                <button
                                    type="button"
                                    className="button is-light is-rounded has-text-weight-semibold is-flex-grow-1 mx-1"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    Kembali
                                </button>
                                <button
                                    type="submit"
                                    className="button is-primary is-rounded has-text-weight-semibold is-flex-grow-1 mx-1"
                                >
                                    Update Catatan
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditNote;