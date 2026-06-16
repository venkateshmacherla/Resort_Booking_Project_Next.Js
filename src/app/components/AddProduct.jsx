'use client';

import React, { useState } from 'react';
import Image from "next/image";
import styles from './AddResort.module.css';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [amenities, setAmenities] = useState('');
  const [availability, setAvailability] = useState(true);

  const addResortHandler = async (e) => {
    e.preventDefault();

    const resortData = {
      title,
      description,
      pricePerNight,
      imageUrl: image,
      imageFile,
      location,
      category,
      maxGuests,
      amenities,
      availability,
    };

    console.log(resortData);

    const data = new FormData()
    data.append('title', title);
    data.append('description', description);
    data.append('pricePerNight', pricePerNight);
    data.append('image', image);
    data.append('imageFile', imageFile);
    data.append('location', location);
    data.append('category', category);
    data.append('maxGuests', maxGuests);
    data.append('amenities', amenities);
    data.append('availability', String(availability));

    try {
      const response = await fetch(`http://localhost:3000/api/admin/add-product`, {
        method: 'POST', 
        body: data,
      })
      const result = await response.json()
      if(result.success) {
          alert("Record Added Successfully");

          setTitle('');
          setDescription('');
          setPricePerNight('');
          setImage('');
          setImageFile(null);
          setLocation('');
          setCategory('');
          setMaxGuests('');
          setAmenities('');
          setAvailability(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add New Resort</h2>

      <form onSubmit={addResortHandler} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Resort Title</label>
          <input
            type="text"
            placeholder="Enter resort title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <textarea
            placeholder="Enter resort description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className={styles.formTextarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Price Per Night (₹)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
            <label className={styles.formLabel}>Resort Image</label>

            <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => setImageFile(e.target.files[0])}
            />

            {imageFile && (
                <Image
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    width={400}
                    height={250}
                    className={styles.imagePreview}
                />
                )
            }
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.formSelect}
            required
          >
            <option value="">Select Category</option>
            <option value="Beach Resort">Beach Resort</option>
            <option value="Mountain Resort">Mountain Resort</option>
            <option value="Luxury Villa">Luxury Villa</option>
            <option value="Lake View Resort">Lake View Resort</option>
            <option value="Adventure Resort">Adventure Resort</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Maximum Guests</label>
          <input
            type="number"
            placeholder="Enter guest capacity"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Amenities</label>
          <input
            type="text"
            placeholder="WiFi, Pool, Parking, Restaurant"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className={styles.formInput}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="availability"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
          <label
            htmlFor="availability"
            className={styles.checkboxLabel}
          >
            Available for Booking
          </label>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
        >
          Add Resort
        </button>
      </form>
    </div>
  );
};

export default AddProduct;