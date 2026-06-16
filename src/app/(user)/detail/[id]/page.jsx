'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import styles from './DynamicProduct.module.css';
import UserNavigation from '@/app/components/UserNavigation';
import CalenderComponent from '@/app/components/CalenderComponent';
import { bookingAction } from '@/app/serverActions/bookingAction';

const DynamicProduct = () => {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calendar Modal State
  const [showCalendar, setShowCalendar] = useState(false);

  // Selected Dates State
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });

  const params = useParams();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const dynamicProductHandler = async () => {
      try {
        const response = await fetch(`/api/admin/product/${id}`);
        const newData = await response.json();

        console.log('Dynamic Data:', newData);

        setRecord(newData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    dynamicProductHandler();
      }, [id]);

      const bookingHandler = async () => {
        try {
          const response = await bookingAction({
            record,
            selectedDates,
          });

          if (response.success) {
            alert("Booking Created Successfully");
            router.push('/');
          } else {
            alert(response.message);
          }

        } catch (error) {
          console.log(error);
        }
      };

      if (loading) {
        return (
          <div className={styles.loading}>
            Loading Resort Details...
          </div>
        );
      }

      if (!record) {
        return (
          <div className={styles.error}>
            Resort not found.
          </div>
        );
      }

      const handleDateSelect = (dates) => {
        setSelectedDates(dates)
        console.log("Dates Coming From CalenderComp:", dates)
      }

  return (
    <>
      <UserNavigation />

      <div className={styles.container}>
        {/* Left Side Image */}
        <div className={styles.imageSection}>
          <Image
            src={record.image}
            alt={record.title}
            width={700}
            height={450}
            className={styles.image}
          />
        </div>

        {/* Right Side Content */}
        <div className={styles.content}>
          <span className={styles.category}>
            {record.category}
          </span>

          <h1 className={styles.title}>
            {record.title}
          </h1>

          <p className={styles.location}>
            📍 {record.location}
          </p>

          <p className={styles.price}>
            ₹ {record.pricePerNight} / Night
          </p>

          <p className={styles.description}>
            {record.description}
          </p>

          <div className={styles.details}>
            <p>
              <strong>Max Guests:</strong> {record.maxGuests}
            </p>

            <p className={styles.availability}>
              <strong>Availability:</strong>{' '}
              {record.availability
                ? 'Available'
                : 'Not Available'}
            </p>
          </div>

          {/* Amenities */}
          <div className={styles.amenities}>
            <h3>Amenities</h3>

            <div className={styles.tags}>
              {record.amenities?.map((item, index) => (
                <span
                  key={index}
                  className={styles.tag}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Selected Dates */}
          {selectedDates.checkIn &&
            selectedDates.checkOut && (
              <div className={styles.selectedDates}>
                <p>
                  <strong>Check-In:</strong>{' '}
                  {selectedDates.checkIn.toDateString()}
                </p>

                <p>
                  <strong>Check-Out:</strong>{' '}
                  {selectedDates.checkOut.toDateString()}
                </p>
              </div>
            )}

          {/* Buttons */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.calendarButton}
              onClick={() => setShowCalendar(true)}
            >
              Select Dates
            </button>

            <button
              className={styles.bookButton}
              disabled={!selectedDates.checkIn}
              onClick={bookingHandler}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Popup Modal */}
      {showCalendar && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Select Your Stay Dates</h2>

            <CalenderComponent 
              onDateSelect={handleDateSelect}
              closeCalendar={() =>
                setShowCalendar(false)
              }
            />

            <button
              className={styles.closeBtn}
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicProduct;