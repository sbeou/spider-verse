export interface IHeroesData {
  id: string;
  name: string;
  universe: number;
  details: {
    fullName: string;
    birsthday: string;
    homeland: string;
    height: number;
    weight: number;
  }
}