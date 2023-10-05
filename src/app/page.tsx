import  styles  from "./page.module.scss";

import HeroesList from "@/components/HeroesList";
import { IHeroesData } from "@/interfaces/heroes";

async function getHeroesData(): Promise<{data: IHeroesData[]}> {
  const res = await fetch(`${process.env.API_URL}/api/heroes`);

  if(!res.ok) {
    throw new Error("Failed to request Heroes List.");
  }

  return res.json();
}

export default async function Home() {

  const heroes = await getHeroesData();

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes.data} />
    </main>
  )
}
