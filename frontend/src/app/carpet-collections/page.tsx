"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Layout/Footer";
import NavbarStyleThree from "@/components/Layout/NavbarStyleThree";
import Link from "next/link";
import { useAuth } from "@/AuthProvider";
import { getTotalImagesSize, updateCarpet, deleteCarpet, addCarpet, getCollections, getCollectionTypes } from "@/api/API";

interface Collection {
  id: number;
  construction: string;
  materials: string;
  origin: string;
  rugId: string;
  imgSize: string
  type: {
    id: number;
    name: string;
    description: string;
  };
  img?: string;
}


interface Types {
  id: number;
  name: string;
  description: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const { logout, loggedIn, setTokenExp } = useAuth();
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCarpet, setSelectedCarpet] = useState<Collection | null>(null);
  const [formData, setFormData] = useState({
    type: { id: 0, name: "", description: "" },
    construction: "",
    materials: "",
    origin: "",
    rugId: "",
    img: "",
    imgSize: ""

  });

  useEffect(() => {
    console.log("User is loggedin : ", loggedIn)
    if (!loggedIn) {
      logout(); // Optionally clear state
      router.push('/login'); 
    }
  }, [loggedIn]);

  if (!loggedIn) return null;

  useEffect(() => {
    const fetchCollections = async () => {
      const data: Collection[] = await getCollections(id, logout, setTokenExp);
      console.log("Fetching Collection ", data);
      setCollections(data);
    };

    const fetchTypes = async () => {
      const data: Types[] = await getCollectionTypes(logout, setTokenExp);
      console.log("Fetching Collection Types ", data);
      setTypes(data);
    };

    fetchCollections();
    fetchTypes();
  }, [id]);

  const handleOpenDetailModal = (collection: Collection) => {
    setSelectedCarpet(collection);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCarpet(null);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSizeInMB = 7;
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > maxSizeInMB) {
        alert(`File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`);
        return;
      }

      const reader = new FileReader();

      const imgSize = (file.size / 1024).toFixed(2);
      console.log(imgSize)
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          img: reader.result as string,
          imgSize: imgSize,
        }));
      };

      reader.readAsDataURL(file);
    }
  };


  const handleOpenModal = (collection?: Collection) => {
    if (collection) {
      setEditingCollection(collection);
      setFormData({
        type: collection.type,
        construction: collection.construction,
        materials: collection.materials,
        origin: collection.origin,
        rugId: collection.rugId,
        img: collection.img || "",
        imgSize: collection.imgSize
      });
    } else {
      setEditingCollection(null);
      setFormData({
        type: { id: id ? parseInt(id) : 0, name: "", description: "" },
        construction: "",
        materials: "",
        origin: "",
        rugId: "",
        img: "",
        imgSize: ""
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCollection(null);
    setFormData({
      type: { id: 0, name: "", description: "" },
      construction: "",
      materials: "",
      origin: "",
      rugId: "",
      img: "",
      imgSize: ""
    });
  };

  const handleFormSubmit = async () => {
    // Trim whitespace
    const trimmedFormData = {
      ...formData,
      construction: formData.construction.trim(),
      materials: formData.materials.trim(),
      origin: formData.origin.trim(),
    };

    // Check if all required fields are filled
    if (
      !trimmedFormData.type.id ||
      !trimmedFormData.construction ||
      !trimmedFormData.materials ||
      !trimmedFormData.origin ||
      !trimmedFormData.rugId
    ) {
      alert("All fields are required. Please fill in all fields.");
      return;
    }

    // Fetch current total image size
    const currentTotalSize = await getTotalImagesSize(logout, setTokenExp);
    const newImageSize = parseFloat(formData.imgSize);

    // Check if the total size exceeds the limit
    if (currentTotalSize + newImageSize > 6500000) {
      alert("Maximum storage limit of 6.5 GB exceeded. Please reduce the image size.");
      return;
    }

    if (editingCollection) {
      // Logic for editing collection
      const updatedData: Collection = {
        id: editingCollection.id, // Include the id
        construction: trimmedFormData.construction,
        materials: trimmedFormData.materials,
        origin: trimmedFormData.origin,
        rugId: trimmedFormData.rugId,
        type: {
          id: trimmedFormData.type.id,
          name: trimmedFormData.type.name || '',
          description: trimmedFormData.type.description || ''
        },
        img: trimmedFormData.img.split(',')[1], // Split to get base64 image content
        imgSize: String(formData.imgSize), // Convert to string
      };

      await updateCarpet(updatedData, logout, setTokenExp); // Call your update API
      console.log("Updated collection", updatedData);

      // Update the collections state
      setCollections(prevCollections =>
        prevCollections.map(collection =>
          collection.id === editingCollection.id ? { ...collection, ...updatedData } : collection
        )
      );
    } else {
      // Logic for adding new collection
      const newCollection = {
        construction: trimmedFormData.construction,
        materials: trimmedFormData.materials,
        origin: trimmedFormData.origin,
        img: trimmedFormData.img.split(',')[1],
        rugId: trimmedFormData.rugId,
        imgSize: parseFloat(formData.imgSize),
        type: { id: trimmedFormData.type.id }
      };
      await addCarpet(newCollection, logout, setTokenExp);
      console.log("Added new collection", newCollection);

      // Refetch collections
      const updatedCollections: Collection[] = await getCollections(id);
      setCollections(updatedCollections);
    }
    handleCloseModal();
  };



  const handleDelete = async (collectionId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this collection?");
    if (confirmDelete) {
      try {
        await deleteCarpet(collectionId, logout, setTokenExp);
        console.log("Deleted collection with ID:", collectionId);

        setCollections(prev => prev.filter(collection => collection.id !== collectionId));
      } catch (error) {
        console.error("Error deleting collection:", error);
        alert("Failed to delete the collection. Please try again.");
      }
    }
  };

  function guessImageType(imageData: any) {
    const firstBytes = imageData.substr(0, 16);
    if (firstBytes.startsWith("ffd8")) {
      return "jpeg";
    }
    if (firstBytes.startsWith("89504e47")) {
      return "png";
    }
    return "jpeg";
  }

  return (
    <>
      <NavbarStyleThree />
      <div className="page-banner-area">
        <div className="container-fluid">
          <div className="page-banner-inner">
            <ul className="list text-uppercase">
              <li>
                <Link href={"/collection-types"} className="text-black hover:text-[#717FF8]">
                  Collections
                </Link>
              </li>
              <li>{name}</li>
            </ul>
          </div>
        </div>
      </div>      <div className="profile-authentication-area ptb-100" style={{ padding: "30px", margin: "20px auto", maxWidth: "80%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <div className="option-item">
            <Link href="#" className="default-btn" onClick={() => handleOpenModal()}>+ Add</Link>
          </div>
        </div>

        {collections.length === 0 ? (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <h4>No Data Found</h4>
          </div>
        ) : (
          <table className="table table-hover" style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px" }}>
            <thead style={{ backgroundColor: "#f1efef" }}>
              <tr>
                <th style={{ padding: "10px 20px", textAlign: "left" }}>#</th>
                <th style={{ padding: "10px 20px", textAlign: "left" }}>Image</th>
                <th style={{ padding: "10px 20px", textAlign: "left" }}>Rug ID</th>
                <th style={{ padding: "10px 20px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {collections.map((collection, index) => (
                <tr key={collection.id ? collection.id : index} className="clickable-row" style={{ backgroundColor: "#f9f9f9", padding: "10px", cursor: 'pointer' }} onClick={() => handleOpenDetailModal(collection)}>
                  <td style={{ padding: "10px 20px" }}>{index + 1}</td>
                  <td style={{ padding: "10px 20px" }}>
                    {collection.img ? (
                      <img
                        src={`data:image/${guessImageType(collection.img)};base64,${collection.img}`}
                        alt='img'
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td style={{ padding: "10px 20px" }}>{collection.rugId}</td>
                  <td style={{ padding: "10px 20px" }} onClick={(e) => e.stopPropagation()}>
                    <i className="ri-edit-box-line" onClick={() => handleOpenModal(collection)}>Edit</i>
                    {" "}|{" "}
                    <i className="ri-delete-bin-2-line" onClick={() => handleDelete(collection.id)}>Delete</i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />

      {/* Modal for Add/Edit Collection */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              {editingCollection ? "Edit Carpet" : "Add Carpet"}
            </h2>
            <form>
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={formData.type.id}
                  onChange={(e) => {
                    const selectedType = types.find(
                      (type) => type.id === parseInt(e.target.value)
                    );
                    setFormData({ ...formData, type: selectedType || { id: 0, name: "", description: "" } });
                  }}
                  className="form-control"
                >
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
              </div>

              <div className="form-group">
                <label>Construction:</label>
                <input
                  type="text"
                  value={formData.construction}
                  onChange={(e) => setFormData({ ...formData, construction: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Materials:</label>
                <input
                  type="text"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Origin:</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Rug ID:</label>
                <input
                  type="text"
                  value={formData.rugId}
                  onChange={(e) => setFormData({ ...formData, rugId: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
                  {editingCollection ? "Save Changes" : "Add Collection"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showDetailModal && selectedCarpet && (
        <div className="detail-modal-overlay">
          <div className="detail-modal-content">
            <button onClick={handleCloseDetailModal} className="btn btn-secondary close-button">Close</button>
            <div className="modal-image">
              {selectedCarpet.img ? (
                <img
                  src={`data:image/${guessImageType(selectedCarpet.img)};base64,${selectedCarpet.img}`}
                  alt='Carpet Image'
                  className="carpet-image"
                />
              ) : (
                <span>No Image Available</span>
              )}
            </div>
            <div className="modal-details">
              <h2>{selectedCarpet.type.name}</h2>
              <p><strong>Construction:</strong> {selectedCarpet.construction}</p>
              <p><strong>Materials:</strong> {selectedCarpet.materials}</p>
              <p><strong>Origin:</strong> {selectedCarpet.origin}</p>
              <p><strong>Rug ID:</strong> {selectedCarpet.rugId}</p>
            </div>
          </div>
        </div>
      )}


      <style jsx>{`
.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
}

.detail-modal-content {
  background-color: white;
  border-radius: 8px;
  display: flex;
  max-width: 800px;
  width: 90%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative; 
}

.modal-image {
  flex: 1;
  padding-right: 20px;
}

.carpet-image {
  width: 100%;
  object-fit: cover;
}

.modal-details {
  flex: 2;
}

.close-button {
  position: absolute; /* Position the button absolutely within the modal */
  top: 10px; /* Space from the top */
  right: 10px; /* Space from the right */
  z-index: 10; /* Ensure the button appears above other elements */
}

  button {
    margin-top: 20px;
  }

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