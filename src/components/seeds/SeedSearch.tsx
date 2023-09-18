import { useState } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";

export function SeedSearch<T>({
  currentSeeds,
  addSeed,
  removeSeed,
  searchSeeds,
  renderSeed,
  renderId,
}: {
  currentSeeds: T[];
  addSeed: (newSeed: T) => void;
  removeSeed: (removedSeed: T) => void;
  searchSeeds: (search: string) => Promise<T[]> | T[];
  renderSeed: (seed: T) => string;
  renderId: (seed: T) => string;
}) {
  const [searchResults, setSearchResults] = useState<T[]>();
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <ul>
        {currentSeeds.map((seed) => (
          <li key={renderId(seed)}>
            {renderSeed(seed)}
            <DeleteIcon
              onClick={() => {
                removeSeed(seed);
              }}
            />
          </li>
        ))}
        <div className="flex">
          <input
            className="bg-slate-700 h-12 p-4 mr-5 grow"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <PrimaryButton
            onClick={async () => {
              if (!search) return;
              const results = await searchSeeds(search);
              console.log(results);
              setSearchResults(results);
            }}
          >
            Search
          </PrimaryButton>
        </div>
        <ul>
          {searchResults &&
            searchResults.map((searchResult) => (
              <li key={renderId(searchResult)}>
                {renderSeed(searchResult)}
                <AddIcon
                  onClick={() => {
                    addSeed(searchResult);
                  }}
                />
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
}
