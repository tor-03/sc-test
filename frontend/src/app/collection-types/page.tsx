"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import PageTitle from "@/components/Common/PageTitle";
import Footer from "@/components/Layout/Footer";
import NavbarStyleThree from "@/components/Layout/NavbarStyleThree";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthProvider";
import { getTotalNumberOfTypes, addCollectionType, deleteCollectionType, updateCollectionType, getCollectionTypes } from "@/api/API";

interface Types {
  id: number;
  name: string;
  description: string;
  position: string;
  coverImg: string;
}

export default function Page() {
  const [types, setTypes] = useState<Types[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; description?: string; position?: string; coverImg?: string }>({});
  const router = useRouter();
  const [editingType, setEditingType] = useState<Types | null>(null);
  const [totalTypes, setTotalTypes] = useState(0);
  const { logout, loggedIn, setTokenExp } = useAuth()
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the uploaded image file


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    position: "",
    coverImg: ""
  });

  useEffect(() => {
    console.log("User is loggedin : ", loggedIn)
    if (!loggedIn) {
      logout(); // Optionally clear state
      router.push('/login'); // Redirect to login page
    }
  }, [loggedIn]);

  if (!loggedIn) return null;

  useEffect(() => {
    const fetchTypes = async () => {
      const data: Types[] = await getCollectionTypes(logout, setTokenExp);
      setTypes(data);
    };

    const fetchTotalTypes = async () => {
      const data: number = await getTotalNumberOfTypes(logout, setTokenExp);
      setTotalTypes(data)
    }

    fetchTypes();
    fetchTotalTypes();
  }, []);

  const handleRowClick = (id: number, name: string) => {
    router.push(`/carpet-collections?id=${id}&name=${encodeURIComponent(name)}`);
  };


  const handleOpenModal = (type?: Types) => {
    if (type) {
      setEditingType(type);
      setFormData({
        name: type.name,
        description: type.description,
        position: type.position,
        coverImg: ""
      });
    } else {
      setEditingType(null);
      setFormData({
        name: "",
        description: "",
        position: "",
        coverImg: ""
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: { name?: string; description?: string; position?: string; coverImg?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.description.trim().length > 60) {
      newErrors.description = "Description can't exceed 60 characters";
    }
    if (!formData.position) {
      newErrors.position = "Position is required";
    }
    if (!imageFile && !editingType?.coverImg) {
      newErrors.coverImg = "Cover Image is required";
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        let imageBase64 = "";
  
        // If a new image file is uploaded, read it as base64
        if (imageFile) {
          const reader = new FileReader();
          imageBase64 = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
          });
        }
  
        const dataToSubmit = {
          ...formData,
          coverImg: imageBase64.split(',')[1] || editingType?.coverImg.split(',')[1] || "" // Use the new image or existing one, or set it to empty string
        };
  
        if (editingType) {
          // Update an existing type
          await updateCollectionType({ ...editingType, ...dataToSubmit }, logout, setTokenExp);
        } else {
          console.log(dataToSubmit)
          await addCollectionType(dataToSubmit, logout, setTokenExp);
        }
  
        const updatedTypes: Types[] = await getCollectionTypes(logout, setTokenExp);
        setTypes(updatedTypes);
        handleCloseModal();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };  


  const handleDelete = async (typeId: number) => {
    const confirmDelete = confirm("If you delete this type all its related collections will also be deleted.\nAre you sure you want to delete this collection type?");
    if (confirmDelete) {
      try {
        await deleteCollectionType(typeId, logout, setTokenExp);
        setTypes(prev => prev.filter(type => type.id !== typeId));
        console.log("Deleted type with ID:", typeId);
      } catch (error) {
        console.error("Error deleting type:", error);
      }
    }
  };


  return (
    <>
      <NavbarStyleThree />
      <PageTitle title="Dashboard" homeText="Home" homeUrl="/" />

      <div className="profile-authentication-area ptb-100" style={{ padding: "30px", margin: "20px auto", maxWidth: "80%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <div className="option-item">
            <Link href="#" className="default-btn" onClick={() => handleOpenModal()}>+ Add</Link>
          </div>
        </div>

        {types.length === 0 ? (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <h4>No Data Found</h4>
          </div>
        ) : (
          <table className="table table-hover" style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px", cursor: 'pointer' }}>
            <thead style={{ backgroundColor: "#f1efef" }}>
              <tr>
                <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>#</th>
                <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Name</th>
                <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Description</th>
                <th style={{ backgroundColor: '#f1efef', color: "black", padding: "10px 20px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {types.filter(type => type !== null && type !== undefined).map((type, index) => (
                <tr
                  key={`${type.id}-${index}`} // Combine id with index for uniqueness
                  className="clickable-row"
                  style={{ backgroundColor: "#f9f9f9", padding: "10px" }}
                  onClick={() => handleRowClick(type.id, type.name)}
                >
                  <td style={{ padding: "10px 20px" }}>{index + 1}</td>
                  <td style={{ padding: "10px 20px" }}>{type.name}</td>
                  <td style={{ padding: "10px 20px" }}>{type.description}</td>
                  <td
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                    onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking icons
                  >
                    <i className="ri-edit-box-line" onClick={() => handleOpenModal(type)}>Edit</i>
                    {" "}|{" "}
                    <i className="ri-delete-bin-2-line" onClick={() => handleDelete(type.id)}>Delete</i>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

      <Footer />

      {/* Modal for Adding or Editing Type */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              {editingType ? "Edit Collection Type" : "Add New Collection Type"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                {errors.coverImg && <span style={{ color: "red" }}>{errors.coverImg}</span>}
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  min={1}
                  max={totalTypes + 1}
                />
                {errors.name && <span style={{ color: "red" }}>{errors.position}</span>}
              </div>
              <div className="form-group">
                <label>Description (max 60 characters)</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={60}
                />
                {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
              </div>
              <div className="modal-buttons">
                <button style={{ marginLeft: '5px' }} type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <style jsx>{`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
  }

  .form-control:focus {
    outline: none;
    border-color: #717ff8;
    box-shadow: 0 0 5px rgba(113, 127, 248, 0.5);
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #b38f72;
    color: white;
    transition: background-color 0.3s;
  }

  .btn-primary:hover {
    background-color: #63452d;
  }

  .btn-secondary {
    background-color: #ddd;
    color: black;
    transition: background-color 0.3s;
  }

  .btn-secondary:hover {
    background-color: #bbb;
  }
`}</style>
    </>
  );
}
