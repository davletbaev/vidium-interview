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

export interface IModifiedEpisode extends IEpisode {
  started: boolean;
  stopped: boolean;
}

export type EpisodesResponse = Array<IEpisode>;

export type ModifiedEpisodesResponse = Array<IModifiedEpisode>;
