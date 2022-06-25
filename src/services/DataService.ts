import { SpaceInterface } from "models/Models";

export default class DataService {
  public async getSpaces(): Promise<SpaceInterface[]> {
    return [
      { id: "123", name: "Best Location", location: "Paris" },
      { id: "124", name: "Best Location", location: "London" },
      { id: "125", name: "Best Location", location: "NewYork" },
    ];
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    return spaceId === "124" ? "5555" : undefined;
  }
}
