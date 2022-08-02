import { render, html, svg } from "https://unpkg.com/uhtml?module";
// https://docs.google.com/spreadsheets/d/1FsgVftIsyZIHd-YzadPVeCW_fFvIipssEnPT3fFSUT8/edit?usp=sharing
let vocab = [
  ["cōpia, cōpiae", "cōpi-", "sing, suppy/abundance, pl- troops/ forces", 1],
  ["Gallia, Galliae", "Galli-", "Gaul (the country)", 1],
  ["glōria, glōriae", "glōri-", "fame/glory", 1],
];

let search = function (keyword) {
  let result = [];
  for (let i = 0; i < vocab.length; i++) {
    if (
      removeSpecialCharacter(
        vocab[i]["word"] + vocab[i]["stem"] + vocab[i]["meaning"]
        // vocab[1][1]
      )
        .toLowerCase()
        .search(removeSpecialCharacter(keyword).toLowerCase()) !== -1
    ) {
      result.push(vocab[i]);
    }
  }
  return result;
};

const dataSource =
  "https://docs.google.com/spreadsheets/d/1FsgVftIsyZIHd-YzadPVeCW_fFvIipssEnPT3fFSUT8/edit?usp=sharing";
const USE_CACHE = false;
// let vocab;

function readDataFromStorage() {
  let sheet = [];
  Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqeXe-XPEmeaSXl0VhtxB1yTdxODmBpplvOEqx4bYrjxV66X9eBtiqoMXsUwOZHlswFGPTdy5nctHJ/pub?output=csv",
    {
      download: true,
      delimiter: ",",
      header: true,
      complete: (results) => {
        console.log(results);
        vocab = results.data;
        init();
      },
    }
  );

  // if (USE_CACHE) {
  //   vocab = JSON.parse(sessionStorage.getItem(storageKey));
  // }
  // if (!vocab) {
  //   // must load from google sheet, processLoadedData will be called in the callback function
  //   Tabletop.init({
  //     key: dataSource,
  //     callback: function (tabletopData) {
  //       vocab = tabletopData;
  //       //sessionStorage.setItem(storageKey, JSON.stringify(data));
  //       init();
  //     },
  //     simpleSheet: true,
  //   });
  // } else {
  // init();
  // }
}

let removeSpecialCharacter = function (s) {
  s = s.replace(/ā/g, "a");
  s = s.replace(/ē/g, "e");
  s = s.replace(/ī/g, "i");
  s = s.replace(/ō/g, "o");
  s = s.replace(/ū/g, "u");
  return s;
};

function init() {
  document
    .querySelector("#searchBtn")
    .addEventListener("click", searchButtonClick);
  document.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchButtonClick();
    }
  });
}

function searchButtonClick() {
  let keyword = document.querySelector("#searchBar").value;
  let result = search(keyword);

  let searchResultDiv = document.querySelector("#searchResult");
  render(
    searchResultDiv,
    html`${result.map(
      (row) => html`
        <div
          class="w-full mt-4 p-4 rounded-lg bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-800"
        >
          <div class="flex flex-row items-center justify-between">
            <div class="flex flex-col w-full">
              <div class="flex flex-row w-full justify-between">
                <div
                  class="text-lg uppercase font-light text-gray-500 flex-grow"
                >
                  ${row["word"]}
                </div>
                <div class="align-top">${row["declension"]}</div>
              </div>

              <div class="text-lg text-bold align-top">${row["stem"]}</div>
              <div class="text-md font-light">${row["meaning"]}</div>
            </div>
          </div>
        </div>
      `
    )}`
  );
}

document.addEventListener("DOMContentLoaded", readDataFromStorage);
// console.log(search("Cōpia"));
// console.log(search("z"));

// console.log(removeSpecialCharacter("Hāllō"));
