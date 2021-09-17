export interface ISpeaker {
  name: string;
}

export interface IEpisode {
  id: number;
  plannedTime: string;
  startTime: string | null;
  stopTime: string | null;
  lines: {
    title: string;
  };
  speakers: Array<ISpeaker>;
}
export interface IModifiedEpisode extends Omit<IEpisode, 'lines'> {
  started: boolean;
  stopped: boolean;
  title: string;
}

export type EpisodesResponse = IEpisode[];

export type ModifiedEpisodesResponse = IModifiedEpisode[];
