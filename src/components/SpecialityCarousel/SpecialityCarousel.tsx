'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { Article } from './types';

type Props = {
  news: Article[];
};

export default function SpecialtyCarousel({ news }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? news.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === news.length - 1 ? 0 : currentIndex + 1);
  };

  const getVisibleCards = () => {
    const cards = [];
    const totalCards = news.length;
    const cardRange = isLargeScreen ? 2 : 1;

    for (let i = -cardRange; i <= cardRange; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      cards.push({
        ...news[index],
        position: i,
        isCenter: i === 0,
      });
    }

    return cards;
  };

  return (
    <div className={styles.carousel}>
      {/* Header */}
      <div className={styles['carousel__header']}>
        <h2 className={styles['carousel__title']}>
          What is the <br /> <span className={styles['carousel__title--specialty']}>Speciality Of Us? </span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div className={styles['carousel__container']}>
        <div className={styles['carousel__viewport']}>
          <div className={styles['carousel__track']}>
            {getVisibleCards().map((card) => {
              const { position } = card;

              let blurAmount = 'blur(0px)';
              let opacity = 1;
              let scale = 1;

              if (position === 0 || Math.abs(position) === 1) {
                blurAmount = 'blur(0px)';
                opacity = 1;
                scale = 1;
              } else {
                blurAmount = 'blur(3px)';
                opacity = 0.7;
                scale = 0.85;
              }

              let slideClass = styles['carousel__slide'];
              switch (position) {
                case 0:
                  slideClass += ` ${styles['carousel__slide--center']}`;
                  break;
                case 1:
                  slideClass += ` ${styles['carousel__slide--adjacent']}`;
                  break;
                default:
                  slideClass += ` ${styles['carousel__slide--outer']}`;
                  break;
              }

              return (
                <motion.div
                  key={`${card.title}-${position}`}
                  animate={{
                    opacity,
                    scale,
                    filter: blurAmount,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: 'tween',
                  }}
                  className={slideClass}
                >
                  <div className={styles['carousel__card']}>
                    {/* Circular Image */}
                    <div className={styles['carousel__image-container']}>
                      <div className={styles['carousel__image-wrapper']}>
                        <img
                          src={card.urlToImage || '/assets/icon-1.png'}
                          alt={card.title}
                          className={styles['carousel__image']}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={styles['carousel__card-title']}>
                      {card.title.split(' ').map((word, index, array) => (
                        <span key={index}>
                          {index === array.length - 1 ? (
                            <span className={styles['carousel__card-title--bold']}>{word}</span>
                          ) : (
                            word
                          )}
                          {index < array.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </h3>
                    <p className={styles['carousel__card-description']}>{card.description?.slice(0, 100)}...</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className={styles['carousel__controls']}>
          <motion.button
            onClick={goToPrevious}
            className={styles['carousel__button']}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <img src="/assets/arrow-left.png" alt="Previous" className={styles['carousel__button-icon']} />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className={styles['carousel__button']}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <img src="/assets/arrow-right.png" alt="Next" className={styles['carousel__button-icon']} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
