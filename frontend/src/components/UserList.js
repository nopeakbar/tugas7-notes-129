import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const UserList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const token = localStorage.getItem("accessToken"); // ambil token dari localStorage
            const response = await axios.get(`${BASE_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${token}` // kirim token ke backend
                }
            });
            setNotes(response.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Gagal mengambil data",
                text: error.response?.data?.message || "Terjadi kesalahan saat mengambil data catatan.",
            });
        }
    };

    const deleteNote = async (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("accessToken");
                    await axios.delete(`${BASE_URL}/notes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
                    setNotes(notes.filter(note => note.id !== id));
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Gagal menghapus",
                        text: error.response?.data?.message || "Terjadi kesalahan saat menghapus data.",
                    });
                }
            }
        });
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-three-quarters">
                <div className="box has-shadow p-5" style={{ borderRadius: "12px" }}>
                    <h2 className="title is-4 has-text-centered has-text-success">Daftar Catatan</h2>
                    <div className="mb-3">
                        <Link to={`add`} className="button is-success is-rounded has-text-weight-semibold">
                             Tambah Catatan
                        </Link>
                    </div>
                    <table className="table is-fullwidth is-striped is-hoverable" style={{ borderRadius: "12px", overflow: "hidden" }}>
                        <thead>
                            <tr className="has-background-success-dark">
                                <th className="has-text-centered">No</th>
                                <th className="has-text-centered">Tanggal</th>
                                <th className="has-text-centered">Kategori</th>
                                <th className="has-text-centered">Isi Catatan</th>
                                <th className="has-text-centered">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={note.id}>
                                    <td className="has-text-centered">{index + 1}</td>
                                    <td className="has-text-centered">{note.date ? note.date.substring(0, 10) : ""}</td>
                                    <td className="has-text-centered">{note.title}</td>
                                    <td>{note.content}</td>
                                    <td className="has-text-centered">
                                        <div className="buttons are-small is-centered">
                                            <Link to={`edit/${note.id}`} className="button is-info is-light">
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteNote(note.id)} className="button is-danger is-light">
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
