"use client";

import React from "react";
import Link from 'next/link';

const Table: React.FC = () => {
    return (
        <>
            <div className="profile-authentication-area ptb-100" style={{ padding: "30px", margin: "20px auto", maxWidth: "80%" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
                    <div className="option-item">
                        <Link href="#" className="default-btn">+ Add</Link>
                    </div>
                </div>
                <table className="table table-hover" style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px" }}>
                    <thead style={{ backgroundColor: "#f1efef" }}>
                        <tr>
                            <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>#</th>
                            <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Type</th>
                            <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Created At</th>
                            <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        <tr className="clickable-row" style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
                            <td style={{ padding: "10px 20px" }}>ID</td>
                            <td style={{ padding: "10px 20px" }}>1</td>
                            <td style={{ padding: "10px 20px" }}>2</td>
                            <td style={{ padding: "10px 20px" }}>action</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default Table;
