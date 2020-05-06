/// <reference types="node" />
declare const citiesDisplay: HTMLElement;
declare const score: HTMLElement;
declare const timer: HTMLElement;
declare const cities: string[];
declare const citiesToShuffle: string[];
declare const citiesFlags: string[];
declare let count: number;
declare let seconds: number;
declare let flagForCorrectAnswer: any;
declare const interval: NodeJS.Timeout;
declare const handlerEvent: (event: Event) => void;
declare const elements: HTMLCollectionOf<Element>;
declare function deleteBorderColorBadAnswer(): void;
declare function init(): void;
declare function display(): void;
declare function win(): void;
declare function lose(): void;
declare function shuffle(a: string[]): string[];
