"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./styles.module.css"

interface SpecialtyItem {
  id: number
  title: string
  description: string
  image: string
}

const specialties: SpecialtyItem[] = [
  {
    id: 1,
    title: "Augmented Reality",
    description:
      "We have the better team to develop all kind of augmented reality design and takes the experience to other level",
    image: "/assets/icon-1.png",
  },
  {
    id: 2,
    title: "Quick Response",
    description: "Anytime you want to talk we are going to be there for you",
    image: "/assets/icon-2.png",
  },
  {
    id: 3,
    title: "Great Communication",
    description: "We maintain 24/7 communication to cover all your need for the project",
    image: "/assets/icon-3.png",
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    description: "We are know for our great attention and dedication at the time of creating projects",
    image: "/assets/icon-4.png",
  },
]

export default function SpecialtyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? specialties.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === specialties.length - 1 ? 0 : currentIndex + 1)
  }

  const getVisibleCards = () => {
    const cards = []
    const totalCards = specialties.length
    const cardRange = isLargeScreen ? 2 : 1

    for (let i = -cardRange; i <= cardRange; i++) {
      const index = (currentIndex + i + totalCards) % totalCards
      cards.push({
        ...specialties[index],
        position: i,
        isCenter: i === 0,
      })
    }

    return cards
  }

  return (
    <div className={styles.carousel}>
      {/* Header */}
      <div className={styles["carousel__header"]}>
        <h2 className={styles["carousel__title"]}>What is the</h2>
        <h2 className={styles["carousel__title"]}>
          <span className={styles["carousel__title--specialty"]}>Speciality</span> Of Us?
        </h2>
      </div>

      {/* Carousel Container */}
      <div className={styles["carousel__container"]}>
        <div className={styles["carousel__viewport"]}>
          <div className={styles["carousel__track"]}>
            {getVisibleCards().map((card) => {
              const { position, isCenter } = card
              const isOuter = Math.abs(position) === 2
              const isAdjacent = Math.abs(position) === 1

              let blurAmount = "blur(0px)"
              let opacity = 1
              let scale = 1

              if (position === 0 || Math.abs(position) === 1) {
                // Center card and adjacent cards - same clear styling
                blurAmount = "blur(0px)"
                opacity = 1
                scale = 1
              } else {
                // Outer cards only - blurred and smaller
                blurAmount = "blur(3px)"
                opacity = 0.7
                scale = 0.85
              }

              let slideClass = styles["carousel__slide"]
              if (position === 0) slideClass += ` ${styles["carousel__slide--center"]}`
              else if (Math.abs(position) === 1) slideClass += ` ${styles["carousel__slide--adjacent"]}`
              else slideClass += ` ${styles["carousel__slide--outer"]}`

              return (
                <motion.div
                  key={`${card.id}-${position}`}
                  animate={{
                    opacity,
                    scale,
                    filter: blurAmount,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "tween",
                  }}
                  className={slideClass}
                >
                  <div className={styles["carousel__card"]}>
                    {/* Circular Image */}
                    <div className={styles["carousel__image-container"]}>
                      <div className={styles["carousel__image-wrapper"]}>
                        <img
                          src={card.image}
                          alt={card.title}
                          className={styles["carousel__image"]}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={styles["carousel__card-title"]}>{card.title}</h3>
                    <p className={styles["carousel__card-description"]}>{card.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className={styles["carousel__controls"]}>
          <motion.button
            onClick={goToPrevious}
            className={styles["carousel__button"]}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <svg className={styles["carousel__button-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className={styles["carousel__button"]}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <svg className={styles["carousel__button-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
