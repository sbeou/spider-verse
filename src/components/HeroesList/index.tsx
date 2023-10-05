"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import HeroPicture from "../HeroesPiscture";

import styles  from "./heroesList.module.scss";

import { spidermanFont } from "@/fonts";
import { IHeroesData } from "@/interfaces/heroes";

interface Iprops {
  heroes: IHeroesData[];
}

export default function HeroesList({ heroes }: Iprops) {
  
  const [max, setMax] = useState(0)

    useEffect(() => {

        setMax(window.innerWidth)
        
    }, [])
  const [visibleItems, setVisibleItems] = useState<IHeroesData[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startInterationPosition, setStartInterationPosition] = useState<number>(0);
  useEffect(() => {
    const indexInArrayScope = ((activeIndex % heroes.length) + heroes.length) % heroes.length;

    const visibleItems = [...heroes, ...heroes].slice(indexInArrayScope, indexInArrayScope +1);
    setVisibleItems(visibleItems)
  }, [heroes, activeIndex])
  const handleChangeActiveIndex = (newClick: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newClick);
  }
  const handleDotChangeActiveIndex = (index: number) => {
    setActiveIndex(index);
  }
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInterationPosition(e.touches[0].clientX);
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if(!startInterationPosition) {
      return null;
    }
   const diffPosition = e.changedTouches[0].clientX - startInterationPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  }
  if (!visibleItems) {
    return null;
  }
  return (
    <>
      <motion.h1 
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2, delay: 2}}
      >
        Personagens
      </motion.h1>
      {max < 768 && (
          <section className={styles.carousel}>
            <ul className={styles.nav}>
              <li className={styles.left} onClick={() => handleChangeActiveIndex(-1)}></li>
              <li className={styles.right} onClick={() => handleChangeActiveIndex(1)}></li>
            </ul>
            {visibleItems.map((hero) => (
              <motion.div
              key={hero.id}
              className={`${styles.image}`}
              initial={{opacity: 0,y: 50}} 
              animate={{opacity: 1, y: 0}} 
              transition={{duration:2}}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Link href={`/hero/${hero.id}`}>
                <HeroPicture 
                  hero={hero}
                />
              </Link>
            </motion.div>
            ))}
            <ul className={styles.dots}>
              {heroes.map((item, index) => (
                <li
                key={item.id}
                onClick={() => handleDotChangeActiveIndex(index)}
                >
                  {index === activeIndex && ( <span></span> )} 
                </li>
              ))}
            </ul>
          </section>
      )}
      <motion.section className={styles.heroes} 
        initial={{opacity: 0,y: -100}} 
        animate={{opacity: 1, y: 0}} 
        transition={{duration:2}}
      >
        {heroes.map(hero => (
          <motion.div 
            key={hero.id} 
            className={`${styles.imageContainer} ${styles[hero.id]}`}
            whileHover={{scale: 1.3}}
            whileTap={{scale: 0.7}}
            transition={{duration: 0.8}}
          >
            <Link href={`/hero/${hero.id}`}>
              <HeroPicture 
                hero={hero}
              />
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </>
  )
}