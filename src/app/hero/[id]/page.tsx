import Carousel from "@/components/Carousel";
import { IHeroesData } from "@/interfaces/heroes";

interface Iprops {
  params: {
    id: string;
  }
}

async function getHeroesData(): Promise<{data: IHeroesData[]}> {
  const res = await fetch(`${process.env.DOMAIN_ORIGIN}/api/heroes`);

  if(!res.ok) {
    throw new Error("Failed to request Heroes List.");
  }

  return res.json();
}

export default async function Hero({params: {id}}: Iprops) {

  const heroes = await getHeroesData();

  return <Carousel heroes={heroes.data} activeId={id} />
}