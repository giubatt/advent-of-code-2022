import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.167.0/path/mod.ts";

import { match } from "npm:ts-pattern";
import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";
import { sum } from "../helpers.ts";

const input = await Deno.readTextFile(
  resolve(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

enum Play {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

enum Result {
  Lose = "Lose",
  Draw = "Draw",
  Win = "Win",
}

const ResultScore = {
  [Result.Lose]: 0,
  [Result.Draw]: 3,
  [Result.Win]: 6,
};

const ShapeScore = {
  [Play.Rock]: 1,
  [Play.Paper]: 2,
  [Play.Scissors]: 3,
};

const rawPlaySchema = z.union([
  z.literal("A"),
  z.literal("B"),
  z.literal("C"),
  z.literal("X"),
  z.literal("Y"),
  z.literal("Z"),
]);
const getPlay = (rawPlay: "A" | "B" | "C" | "X" | "Y" | "Z") => {
  return match(rawPlay)
    .with("A", () => Play.Rock)
    .with("B", () => Play.Paper)
    .with("C", () => Play.Scissors)
    .with("X", () => Play.Rock)
    .with("Y", () => Play.Paper)
    .with("Z", () => Play.Scissors)
    .exhaustive();
};
const getResult = (rawResult: "X" | "Y" | "Z") => {
  return match(rawResult)
    .with("X", () => Result.Lose)
    .with("Y", () => Result.Draw)
    .with("Z", () => Result.Win)
    .exhaustive();
};

const parseInput = (input: string) => {
  return input.split("\n").filter((line) => line).map((line) =>
    line.split(" ").map((rawPlay) => {
      const play = rawPlaySchema.parse(rawPlay);
      return getPlay(play);
    })
  );
};

const rawParseInput = (input: string) => {
  return input.split("\n").filter((line) => line).map((line) => {
    const rawMatch = line.split(" ");
    const match = z.tuple([
      z.union([
        z.literal("A"),
        z.literal("B"),
        z.literal("C"),
      ]),
      z.union([
        z.literal("X"),
        z.literal("Y"),
        z.literal("Z"),
      ]),
    ]).parse(rawMatch);
    return match;
  });
};

console.log(rawParseInput(input));

const getResultScore = (opponent: Play, player: Play) => {
  return match(opponent)
    .with(Play.Rock, () =>
      match(player)
        .with(Play.Rock, () => ResultScore[Result.Draw])
        .with(Play.Paper, () => ResultScore[Result.Win])
        .with(Play.Scissors, () => ResultScore[Result.Lose])
        .exhaustive())
    .with(Play.Paper, () =>
      match(player)
        .with(Play.Rock, () => ResultScore[Result.Lose])
        .with(Play.Paper, () => ResultScore[Result.Draw])
        .with(Play.Scissors, () => ResultScore[Result.Win])
        .exhaustive())
    .with(Play.Scissors, () =>
      match(player)
        .with(Play.Rock, () => ResultScore[Result.Win])
        .with(Play.Paper, () => ResultScore[Result.Lose])
        .with(Play.Scissors, () => ResultScore[Result.Draw])
        .exhaustive())
    .exhaustive();
};

const getPlayForResult = (opponent: Play, result: Result): Play => {
  return match(opponent)
    .with(Play.Rock, () =>
      match(result)
        .with(Result.Draw, () => Play.Rock)
        .with(Result.Win, () => Play.Paper)
        .with(Result.Lose, () => Play.Scissors)
        .exhaustive())
    .with(Play.Paper, () =>
      match(result)
        .with(Result.Draw, () => Play.Paper)
        .with(Result.Win, () => Play.Scissors)
        .with(Result.Lose, () => Play.Rock)
        .exhaustive())
    .with(Play.Scissors, () =>
      match(result)
        .with(Result.Draw, () => Play.Scissors)
        .with(Result.Win, () => Play.Rock)
        .with(Result.Lose, () => Play.Paper)
        .exhaustive())
    .exhaustive();
};

const matches = parseInput(input);

const matchScores = matches.map((match) => {
  const opponentPlay = match[0];
  const playerPlay = match[1];

  const resultScore = getResultScore(opponentPlay, playerPlay);
  const shapeScore = ShapeScore[Play[playerPlay]];

  return resultScore + shapeScore;
});

console.log(sum(matchScores));

const rawMatches = rawParseInput(input);

const realMatchScores = rawMatches.map((match) => {
  const opponentPlay = getPlay(match[0]);
  const expectedResult = getResult(match[1]);

  const playerPlay = getPlayForResult(opponentPlay, expectedResult);
  const shapeScore = ShapeScore[Play[playerPlay]];
  const resultScore = ResultScore[expectedResult];
  return resultScore + shapeScore;
});

console.log(sum(realMatchScores));
