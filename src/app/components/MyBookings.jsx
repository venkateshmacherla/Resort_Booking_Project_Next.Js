'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MyBookings.module.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();

        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Bookings...
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className={styles.emptyState}>
          No bookings found.
        </div>
      ) : (
        <div className={styles.bookingGrid}>
          {bookings.map((booking) => {
            const checkIn = new Date(
              booking.startDate
            );

            const checkOut = new Date(
              booking.endDate
            );

            const totalNights = Math.ceil(
              (checkOut - checkIn) /
                (1000 * 60 * 60 * 24)
            );

            const totalAmount =
              totalNights * booking.price;

            return (
              <div
                key={booking._id}
                className={styles.bookingCard}
              >
                <Image
                  src={booking.image}
                  alt={booking.productName}
                  width={400}
                  height={250}
                  className={styles.bookingImage}
                  unoptimized
                />

                <div className={styles.cardContent}>
                  <h2
                    className={styles.resortName}
                  >
                    {booking.productName}
                  </h2>

                  <p>
                    📅 Check-In:{' '}
                    {checkIn.toLocaleDateString(
                      'en-IN',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </p>

                  <p>
                    📅 Check-Out:{' '}
                    {checkOut.toLocaleDateString(
                      'en-IN',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </p>

                  <p>
                    🌙 Nights:{' '}
                    {totalNights}
                  </p>

                  <p>
                    💰 Price / Night:
                    ₹{booking.price}
                  </p>

                  <p
                    className={
                      styles.totalPrice
                    }
                  >
                    💵 Total Amount:
                    ₹{totalAmount}
                  </p>

                  <div
                    className={
                      styles.statusBadge
                    }
                  >
                    {
                      booking.bookingStatus
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;