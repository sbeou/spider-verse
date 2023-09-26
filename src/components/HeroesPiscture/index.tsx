import Image, { StaticImageData } from "next/image";

import ImageMulherAranha65 from "@public/spiders/mulher-aranha-65.png";
import ImageSpDr14512 from "@public/spiders/sp-dr-14512.png";
import ImageSpiderHam8311 from "@public/spiders/spider-ham-8311.png";
import ImageSpiderMan616 from "@public/spiders/spider-man-616.png";
import ImageSpiderMan928 from "@public/spiders/spider-man-928.png";
import ImageSpiderMan1610 from "@public/spiders/spider-man-1610.png";
import ImageSpiderMan90214 from "@public/spiders/spider-man-90214.png";
import { IHeroesData } from "@/interfaces/heroes";

const heroesImage: Record<string, StaticImageData> = {
  "mulher-aranha-65": ImageMulherAranha65,
  "sp-dr-14512": ImageSpDr14512,
  "spider-ham-8311": ImageSpiderHam8311,
  "spider-man-616": ImageSpiderMan616,
  "spider-man-928": ImageSpiderMan928,
  "spider-man-1610": ImageSpiderMan1610,
  "spider-man-90214": ImageSpiderMan90214
}

interface Iprops { 
  hero: IHeroesData;
}

export default function HeroPicture({ hero }: Iprops) {
  return (
    <Image 
      src={heroesImage[hero.id]} 
      alt={`${hero.name} (Universo-${hero.universe})`}
      priority
    />
  )
}