"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroesDetails from "../HeroesDetails";
import HeroPicture from "../HeroesPiscture";

import styles from "./carousel.module.scss";

import { IHeroesData } from "@/interfaces/heroes";

enum enPosition {
  FRON = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface Iprops {
  heroes: IHeroesData[];
  activeId: string;
}

export default function Carousel({heroes, activeId}: Iprops) {
  const [visibleItems, setVisibleItems] = useState<IHeroesData[] | null>(null);

  const [activeIndex, setActiveIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  )
  const [startInterationPosition, setStartInterationPosition] = useState<number>(0);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  const [max, setMax] = useState(0)

    useEffect(() => {

        setMax(window.innerWidth)
        
    }, [])
  
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "mulher-aranha-65": new Audio("songs/mulher-aranha-65.mp3"),
      "sp-dr-14512": new Audio("songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("songs/spider-ham-8311.mp3"),
      "spider-man-616": new Audio("songs/spider-man-616.mp3"),
      "spider-man-928": new Audio("songs/spider-man-928.mp3"),
      "spider-man-1610": new Audio("songs/spider-man-1610.mp3"),
      "spider-man-90214": new Audio("songs/spider-man-90214.mp3"),
  }), []);

  useEffect(() => {
    const indexInArrayScope = ((activeIndex % heroes.length) + heroes.length) % heroes.length;

    const visibleItems = [...heroes, ...heroes].slice(indexInArrayScope, indexInArrayScope + 3);
    setVisibleItems(visibleItems)
  }, [heroes, activeIndex])

  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (!htmlEl || !visibleItems) {
      return;
    }

    const currentHeroId = visibleItems[enPosition.MIDDLE].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlEl.classList.add("hero-page");
    return () => {
      htmlEl.classList.remove("hero-page");
    }

  },[visibleItems]);

  useEffect(() => {
    if (!visibleItems) {
      return;
    }
    transitionAudio.play();

    const voiceAudio = voicesAudio[visibleItems[enPosition.MIDDLE].id];
    if(!voiceAudio) {
      return;
    }
    voiceAudio.volume = 0.3;
    voiceAudio.play();
  }, [visibleItems, transitionAudio, voicesAudio]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartInterationPosition(e.clientX);
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if(!startInterationPosition) {
      return null;
    }
   handleChangeDragTouch(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInterationPosition(e.touches[0].clientX);
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if(!startInterationPosition) {
      return null;
    }
   handleChangeDragTouch(e.changedTouches[0].clientX)
  }

  const handleChangeDragTouch = (clientX: number) => {
     const endInterationPosition = clientX;
    const diffPosition = endInterationPosition - startInterationPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  }

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  }
  if (!visibleItems) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, position) => (
              max < 768 ? (
                <motion.div 
                  key={item.id} 
                  className={styles.hero}
                  initial={{ x: -500, scale: 0.75 }}
                  animate={{ x: 0, ...getItemStyle(position) }}
                  exit={{ x:0, left: "-20%", opacity:0 }}
                  transition={{duration:0.8}}
                >
                  <HeroPicture hero={item} />
                </motion.div>
              ) : (
                <motion.div 
                  key={item.id} 
                  className={styles.hero}
                  initial={{ x: -500, scale: 0.75 }}
                  animate={{ x: 0, ...getItemStyle(position) }}
                  exit={{ x:0, left: "-20%", opacity:0 }}
                  transition={{duration:0.8}}
                >
                  <HeroPicture hero={item} />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
      <motion.div 
        id={'detailsBackground'}
        className={`${styles.details} ${styles[visibleItems[enPosition.MIDDLE].id]}`}
        initial={{opacity: 0}} 
        animate={{opacity:1}} 
        transition={{delay:1, duration: 2}}
      >
        <HeroesDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  )
}

const getItemStyle = (position: enPosition) => {
  
  if (window.innerWidth < 768) {
    if (position === enPosition.FRON) {
      return {
        zIndex: 3,
        filter: 'blur(10px)',
        scale: 0.8,
        left:"-60%",
      }
    }
    if (position === enPosition.MIDDLE) {
      return {
        zIndex: 2,
        scale: 1.1,
        top:"18%",
      }
    }
    return {
      zIndex: 1,
      filter: 'blur(10px)',
      scale: 0.6,
      left: "40%",
      top: '-5%',
      opacity: 0.8,
    }
  }
  else {
    if (position === enPosition.FRON) {
      return {
        zIndex: 3,
        filter: 'blur(10px)',
        scale: 1.2,
      }
    }
    if (position === enPosition.MIDDLE) {
      return {
        zIndex: 2,
        left: 300,
        scale: 0.8,
        top: '-10%',
      }
    }
    return {
      zIndex: 1,
      filter: 'blur(10px)',
      scale: 0.6,
      left: 160,
      top: '-20%',
      opacity: 0.8,
    }
  }
}