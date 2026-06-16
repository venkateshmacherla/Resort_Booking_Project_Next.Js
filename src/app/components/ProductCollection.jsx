'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCollection.module.css';

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/admin/add-product');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const newData = await response.json();

        if (mounted) {
          setCollections(newData.data || []);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCollections();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h2>Loading Resorts...</h2>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>
        Explore Luxury Resorts
      </h1>

      <div className={styles.resortGrid}>
        {collections.length === 0 ? (
          <h2>No Resorts Found</h2>
        ) : (
          collections.map((item) => (
            <div
              key={item._id}
              className={styles.resortCard}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={150}
                  className={styles.resortImage}
                />

                <span className={styles.categoryBadge}>
                  {item.category}
                </span>
              </div>

              <div className={styles.cardContent}>
                <h2 className={styles.resortTitle}>
                  {item.title}
                </h2>

                <div className={styles.detailsSection}>
                  <p>
                    📍 <strong>{item.location}</strong>
                  </p>

                  <p className={styles.price}>
                    ₹ {item.pricePerNight} / Night
                  </p>
                </div>

                <div className={styles.buttonContainer}>
                  <Link href={`/detail/${item._id}`}>
                    <button className={styles.detailsButton}>
                      View Details
                    </button>
                  </Link>

                  <Link href={`/detail/${item._id}`}>
                    <button className={styles.bookButton}>
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCollection;