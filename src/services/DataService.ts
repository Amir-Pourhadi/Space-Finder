import { Space } from "models/Models";

export default class DataService {
  public async getSpaces(): Promise<Space[]> {
    return [
      { id: "123", name: "Best Location", location: "Paris" },
      { id: "124", name: "Best Location", location: "London" },
      { id: "125", name: "Best Location", location: "NewYork" },
    ];
  }
}
