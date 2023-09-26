"use client";

import { motion } from "framer-motion";

import HeroPicture from "../HeroesPiscture";

import styles  from "./heroesList.module.scss";

import { sidermanFont } from "@/fonts";
import { IHeroesData } from "@/interfaces/heroes";

interface Iprops {
  heroes: IHeroesData[];
}

export default function HeroesList({ heroes }: Iprops) {
  return (
    <>
      <motion.h1 
        className={`${sidermanFont.className} ${styles.title}`}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2, delay: 2}}
      >
        Personagens
      </motion.h1>
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
            <HeroPicture 
              hero={hero}
            />
          </motion.div>
        ))}
      </motion.section>
    </>
  )
}