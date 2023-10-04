import { Quicksand } from "next/font/google"
import Image from "next/image";

import styles from './heroesDetails.module.scss';

import { spidermanFont } from "@/fonts"
import { IHeroesData } from "@/interfaces/heroes";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
})

interface IProps {
  data: IHeroesData;
}

export default function HeroesDetails({data}: IProps) {
  const {id, name, universe, details} = data;
  return (
    <div className={quicksand.className}>
      <h1 className={`${spidermanFont.className} ${styles.title}`}>
        {name} (Universo-{universe})
      </h1>
      <div className={styles.details}>
        <h2 className={styles.subtitle}>Informações</h2>
        <ul className={styles.listDetails}>
          <li className={styles.label}>Nome Completo</li>
          <li>{details.fullName}</li>
          <li className={styles.break}></li>
          <li className={styles.label}>Data de Nascimento</li>
          <li>{new Date(details.birthday).toLocaleDateString("pt")}</li>
          <li className={styles.break}></li>
          <li className={styles.label}>Terra Natal</li>
          <li>{details.homeland}</li>
          <li className={styles.break}></li>
          <li className={styles.label}>Altura</li>
          <li>{details.height.toFixed(2)}m</li>
          <li className={styles.break}></li>
          <li className={styles.label}>Peso</li>
          <li>{details.weight.toFixed(2)}kg</li>
          <li className={styles.break}></li>
        </ul>
      </div>
      <div className={styles.details}>
        <h2 className={styles.subtitle}>Primeira Aparição</h2>
        <Image
          src={`/spiders/${id}-comic-book.png`}
          alt={`Primeira aparição de ${name} no universo ${universe}`}
          width={80}
          height={120}
        />
      </div>
    </div>
   )
}