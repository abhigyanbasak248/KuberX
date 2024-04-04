import React, { useState } from "react";
import axios from "axios";

function ImageForm() {
  const [textData, setTextData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleTextChange = (e) => {
    setTextData(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to append the form data
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("text", textData);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        action="/user/upload"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="somefield">Enter some text:</label>
        <input
          className="text-black"
          type="text"
          id="somefield"
          name="somefield"
          value={textData}
          onChange={handleTextChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImageForm;
