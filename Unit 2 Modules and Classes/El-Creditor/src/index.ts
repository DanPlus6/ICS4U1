//@ts-ignore

const COUNTRY_AND_BANK_TO_BIN_OBJ: Record<string, string[]> = loadJSON(
  "CBB.json",
) as Record<string, string[]>;

const ALL_BANKS: Record<string, string[]> = loadJSON("Banks.json") as Record<
  string,
  string[]
>;

const CONVERT: Record<string, string> = loadJSON("country_convert.json");

const ALL_COUNTRIES: string[] = loadJSON("Countries.json") as string[];

const DISPLAY_COUNTRIES: string[] = loadJSON("Display_Countries.json");

const BIN_SEARCH: Record<string, string> = loadJSON("BBC.json") as Record<
  string,
  string
>;

// load all JSONs from saved data and turn them into string to string array hashmaps or string arrays

// gets HTML elements by Id
const P_CARD_DISPLAY = document.getElementById(
  "card-number-display",
) as HTMLParagraphElement;
const P_SAVE_LIST = document.getElementById("saved-list") as HTMLElement;
const DIV_VIEW_AREA = document.getElementById("view-area") as HTMLElement;
const DIV_MAIN_AREA = document.getElementById("main-area") as HTMLElement;
const DIV_SAVE_MENU = document.getElementById("save-menu") as HTMLElement;
const DIV_INPUT_AREA = document.getElementById("input-area") as HTMLElement;
const DIV_CREDIT_CARD = document.getElementById("credit-card") as HTMLElement;
const DIV_CUSTOMIZE_AREA = document.getElementById(
  "customize-area",
) as HTMLElement;
const TXT_USERNAME_INPUT = document.getElementById(
  "username-input",
) as HTMLInputElement;
const INPUT_COLOUR_PICKER = document.getElementById(
  "colour-picker",
) as HTMLInputElement;
const SEARCH_OUTPUT = document.getElementById("searchOutput") as HTMLElement;

//create constants to read country and bank input box and search list display
const COUNTRY_INPUT = document.getElementById(
  "countryInput",
) as HTMLInputElement;
const BANK_INPUT = document.getElementById("bankInput") as HTMLInputElement;
const SEARCH_LIST = document.getElementById("searchList") as HTMLUListElement;

//create event listeners to filter for the country/bank the user wants depending on what they typed in the search bars
//also we disable the country search bar after enabling the bank one
COUNTRY_INPUT.addEventListener("input", () => {
  const COUNTRY_VALUE = COUNTRY_INPUT.value.toUpperCase();
  SEARCH_LIST.innerHTML = "";
  const FILTERED_COUNTRY = DISPLAY_COUNTRIES.filter((country) =>
    country.toUpperCase().includes(COUNTRY_VALUE),
  );

  FILTERED_COUNTRY.slice(0, 10).forEach((country) => {
    const RESULT_ELEMENT = document.createElement("li");
    RESULT_ELEMENT.textContent = country;
    RESULT_ELEMENT.style.borderStyle = "solid";
    RESULT_ELEMENT.addEventListener("click", () => {
      COUNTRY_INPUT.value = country;
      SEARCH_LIST.classList.add("hidden");
      COUNTRY_INPUT.disabled = true;
      COUNTRY_INPUT.classList.add("disabled-input");
      SEARCH_LIST.innerHTML = "";
      BANK_INPUT.disabled = false;
      BANK_INPUT.classList.remove("disabled-input");
    });
    SEARCH_LIST.appendChild(RESULT_ELEMENT);
  });
  SEARCH_LIST.classList.remove("hidden");
});

BANK_INPUT.addEventListener("input", () => {
  const BANK_VALUE = BANK_INPUT.value.toUpperCase();
  SEARCH_LIST.innerHTML = "";
  const FILTERED_BANK = ALL_BANKS[CONVERT[COUNTRY_INPUT.value]!]!.filter(
    (bank) => bank.toUpperCase().includes(BANK_VALUE),
  );

  FILTERED_BANK.slice(0, 10).forEach((bank) => {
    const RESULT_ELEMENT = document.createElement("li");
    RESULT_ELEMENT.textContent = bank;
    RESULT_ELEMENT.style.borderStyle = "solid";
    RESULT_ELEMENT.addEventListener("click", () => {
      BANK_INPUT.value = bank;
      SEARCH_LIST.classList.add("hidden");
      BANK_INPUT.disabled = true;
      BANK_INPUT.classList.add("disabled-input");
      SEARCH_LIST.innerHTML = "";
    });
    SEARCH_LIST.appendChild(RESULT_ELEMENT);
  });
  SEARCH_LIST.classList.remove("hidden");
});

function cancelButton() {
  COUNTRY_INPUT.value = "";
  BANK_INPUT.value = "";
  COUNTRY_INPUT.disabled = false;
  BANK_INPUT.disabled = true;
  COUNTRY_INPUT.classList.remove("disabled-input");
  BANK_INPUT.classList.add("disabled-input");
}

// initializes currentCard as an empty string
let currentCard: string = "";

// the function loads JSONs using magic that you gave me :thumbs_up: + yippiee.wav
// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath: string, mimeType: any): string | null {
  const xmlhttp: XMLHttpRequest = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
    return xmlhttp.responseText;
  } else {
    // TODO Throw exception
    return null;
  }
}

// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath: string): any {
  // Load json file;
  const json: string | null = loadTextFileAjaxSync(
    filePath,
    "application/json",
  );

  if (json) {
    // Parse json
    return JSON.parse(json);
  }
  return null;
}

/**
 * this function searches using BINSearch record to get any data asociated with a BIN number
 * preconditions:
 * credit card number is a string and BINSearch record is defined to do the look ups
 * postconditions:
 * returns country and issuer if it exists in database
 * returns no known record if it doesn't exist in database
 * @param num we take the credit card number in the form of a string
 * @returns the country and issuer record if it exists, otherwise it returns failure messaage
 */

function searchHelper() {
  const EXIST: string | undefined = INPUT.value;

  let ans;
  if (EXIST) {
    ans = searchCreditCard(EXIST);
    SEARCH_OUTPUT.innerText = ans;
  } else {
    SEARCH_OUTPUT.innerText = "Not a Valid Number";
  }
}

function searchCreditCard(num: string): string {
  //define BIN string as the first 6 digits of the creditcard number
  let BIN: string = num.slice(0, 6);
  // if the record exists we return it otherwise continue
  if (BIN_SEARCH[BIN]) {
    return BIN_SEARCH[BIN];
  } else {
    // if the record doesn't exist we lower the BIN to the first 5 numbers since some chinese credit cards do that
    let BIN: string = String(num).slice(0, 5);
    //if the record exists we return it otherwise return no known record
    if (BIN_SEARCH[BIN]) {
      return BIN_SEARCH[BIN];
    } else {
      return "No Known Record";
    }
  }
}

// get cc-number inputted by user as constant
const INPUT: HTMLInputElement = document.getElementById(
  "CC-num",
) as HTMLInputElement;

/**
 * this function generates credit card numbers based off of the requirements given by the user
 * -preconditions the user must have called the function from the helper function
 * the country and bank files must already be there and have been initialized
 * - postconditions we return a number that satisfies the user's specifications
 * @param country default value is random and we intake whatever country the user wants
 * @param bank default is random and we intake whatever bank the user wants
 * @returns we return the randomly generated creditcard number
 */

function generateCreditCardNumber(
  country: string = "Random",
  bank: string = "Random",
): string {
  let ans: string = "";
  if (country == "Random") {
    // generate a random country from the array of possible countries and define that as the country variable
    country = ALL_COUNTRIES[Math.floor(Math.random() * ALL_COUNTRIES.length)]!;
  }
  if (bank == "Random") {
    //generate a random bank from the chosen country and define that to bank variable
    bank =
      ALL_BANKS[country]![
        Math.floor(Math.random() * ALL_BANKS[country]!.length)
      ]!;
  }
  // turn the country and bank into a key and use that to generate a random valid 5-6 digit BIN then generate random digits
  // adding up to 12-19 including the 5-6 BIN numbers except for the security number
  let key: string = country + " " + bank;
  ans +=
    COUNTRY_AND_BANK_TO_BIN_OBJ[key]![
      Math.floor(Math.random() * (COUNTRY_AND_BANK_TO_BIN_OBJ[key]!.length - 1))
    ];
  ans += String(
    Math.floor(
      Math.random() * 10 ** Math.floor(Math.random() * (19 - ans.length)),
    ),
  );
  // we find the security number by using validate credit card function with a zero at the end to find the required sum and add
  // it to the end in order to validate it, then we return the value
  ans += String((10 - (validateCreditCardNumber(ans + "0", true) % 10)) % 10);
  if (validateCreditCardNumber(ans) == 1) {
    currentCard = ans;
  }
  return ans;
}
/**
 * this is a helper function that runs the generator and checks what the parameters are
 * -preconditions both bank input and country input exists and possibly exist
 * -postconditions change the card display to the answer generated and display save menu
 */
function generateHelper() {
  let ans;
  let countryExist = CONVERT[COUNTRY_INPUT.value];
  let bankExist = BANK_INPUT.value;
  if (
    countryExist &&
    ALL_COUNTRIES.includes(countryExist) &&
    bankExist &&
    COUNTRY_AND_BANK_TO_BIN_OBJ[countryExist + " " + bankExist]
  ) {
    ans = generateCreditCardNumber(countryExist, bankExist);
  } else if (countryExist && ALL_COUNTRIES.includes(countryExist)) {
    ans = generateCreditCardNumber(countryExist);
  } else {
    ans = generateCreditCardNumber();
  }

  P_CARD_DISPLAY.innerText = ans;
  DIV_SAVE_MENU.style.display = "block";
}

/**
 * Helper function that connects the UI input to the validator logic
 *
 * Preconditions:
 * - 'input' must be an HTML element with a value property
 * - validateCreditCardNumber must be defined and return 1 for a valid card
 *
 * Postconditions:
 * - displays an alert of "Valid Credit Card" if the input passes the Luhn check
 * - displays an alert of "Invalid Credit Card" if the input is empty or fails the check
 */
function validateHelper(): void {
  // gets the credit card number and validates it
  let temp = validateCreditCardNumber(INPUT.value);

  if (temp == 1) {
    alert("Valid Credit Card");
  } else {
    alert("Invalid Credit Card");
  }
}

/**
 * Validates a credit card using Luhn algorithm
 *
 * Preconditions:
 * - input value must contain a string as a credit card number
 * - credit card should be made up of string numbers
 *
 * Postconditions:
 * - returns true if the credit card number is validated by Luhn algorithm
 * - returns false when card fails Luhn algorithm or doesn't contain numbers
 * - if returnSum is true, returns the raw calculated sum instead
 *
 * @param cardNumber the number of the credit card
 * @param returnSum flags to return the raw sum to be validated
 * @returns 1 for valid number, 0 for invalid number, or the total sum if returnSum is true
 */
function validateCreditCardNumber(
  cardNumber: string,
  returnSum: boolean = false,
): number {
  if (cardNumber.length == 0) {
    return 0;
  }

  // initializes the sum as 0
  let sum: number = 0;

  // converts cardNumber to number data type and checks if there are only numbers
  if (isNaN(Number(cardNumber))) {
    return 0;
  }

  // checks every digit of the credit card
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    // initializes the digit's distance from the check sum
    let digitDistance: number = cardNumber.length - 1 - i;

    // stores the current digit and converts to number data type
    let currentDigit: number = Number(cardNumber[i]);

    // checks if distance from check sum is odd
    if (digitDistance % 2 == 1) {
      // doubles the current digit
      let doubledDigit: number = currentDigit * 2;

      // if doubledDigit has two digits, add both digits to sum
      if (doubledDigit >= 10) {
        sum += Math.floor(doubledDigit / 10) + (doubledDigit % 10);
      } else {
        // adds the doubled digit to total sum
        sum += doubledDigit;
      }
    } else {
      // adds the current digit to total sum
      sum += currentDigit;
    }
  }

  // checks if the generated credit card sum is required to create a valid checksum
  if (returnSum) {
    return sum;
  }

  // checks if sum is divisible by 10
  if (sum % 10 == 0) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Hides menus, displays main, and clears username input
 *
 * Preconditions:
 * - TXT_USERNAME_INPUT and TXT_DIV_MAIN_AREA must exist in the HTML
 *
 * Postconditions:
 * - all menu DIVs are hidden except for DIV_MAIN_AREA
 * - the username textbox is empty
 */
function resetMenu(): void {
  hideMenus();
  displayMenu("main");
  TXT_USERNAME_INPUT.value = "";
}

/**
 * Validates the username and saves the current card data to localStorage
 *
 * Preconditions:
 * - TXT_USERNAME_INPUT must contain the user's name
 * - currentCard must be defined with the card number to be saved
 *
 * Postconditions:
 * - if input is empty, alerts user to enter username
 * - if valid, data is saved to 'registered_cards' in localStorage and menu is reset
 */
function confirmSave(): void {
  // gets the username from a textbox
  let usernameInput = TXT_USERNAME_INPUT.value;

  // checks if user entered a name
  if (usernameInput == "") {
    // alerts user to enter a username
    return alert("Enter Username");
  }

  // gets data from localStorage and initializes current data to be empty
  let initialData = localStorage.getItem("registered_cards");
  let currentData = "";

  // if there is saved data, parse it and store it in currentData
  if (initialData != null) {
    currentData = JSON.parse(initialData);
  }

  // updates current data with a username and generated card on a new line
  let updatedData = currentData + usernameInput + ": " + currentCard + "\n";

  // saves the updated data back into localStorage as a string
  localStorage.setItem("registered_cards", JSON.stringify(updatedData));

  // alerts the user that the username has been saved and returns to the main menu
  alert("Username Saved");
  resetMenu();
}

/**
 * Toggles the view area to show the list of saved credit cards
 *
 * Preconditions:
 * - DIV_VIEW_AREA and P_SAVE_LIST must exist in the HTML
 * - 'registered_cards' data should be in localStorage (or null)
 *
 * Postconditions:
 * - displays the view menu if it was hidden, otherwise returns to main
 * - P_SAVE_LIST displays saved data or a "No cards" message
 */
function viewCards(): void {
  // gets the data from the 'registered_cards' key
  let savedData = localStorage.getItem("registered_cards");

  // checks if the save list is displayed
  if (DIV_VIEW_AREA.style.display == "none") {
    // displays the view area
    displayMenu("view");

    // checks if there is saved data
    if (savedData == null) {
      P_SAVE_LIST.innerText = "No cards saved.";
    } else {
      // updates and displays the saved usernames and credit cards in a save list
      P_SAVE_LIST.innerText = JSON.parse(savedData);
    }
  } else {
    // displays the main menu
    displayMenu("main");
  }
}

/**
 * Updates the card's background colour and returns to the main menu.
 *
 * Preconditions:
 * - INPUT_COLOUR_PICKER must have a valid color value
 * - DIV_CREDIT_CARD must exist in the DOM
 *
 * Postconditions:
 * - DIV_CREDIT_CARD background color is updated
 * - the UI returns to the main menu
 */
function chooseColour() {
  // changes the credit card colour based on the value from colour picker
  DIV_CREDIT_CARD.style.backgroundColor = INPUT_COLOUR_PICKER.value;

  // displays the main menu
  displayMenu("main");
}

/**
 * Sets the display style of all menu containers to 'none'.
 *
 * Preconditions:
 * - all global menu DIV variables must be initialized
 *
 * Postconditions:
 * - all specified menu elements are hidden from the user's view
 */
function hideMenus(): void {
  // all divs display is none
  DIV_CUSTOMIZE_AREA.style.display = "none";
  DIV_INPUT_AREA.style.display = "none";
  DIV_MAIN_AREA.style.display = "none";
  DIV_SAVE_MENU.style.display = "none";
  DIV_VIEW_AREA.style.display = "none";
}

/**
 * Displays a specific menu by name.
 *
 * Preconditions:
 * - div parameter must be a valid menu key ('customize', 'input', 'main', 'save', 'view')
 *
 * Postconditions:
 * - all menus are hidden, then the specified menu is set to 'block'
 *
 * @param div the string key of the div to display
 */
function displayMenu(div: string): void {
  // hides all menus
  hideMenus();

  // displays the specified div
  if (div == "customize") DIV_CUSTOMIZE_AREA.style.display = "block";
  if (div == "input") DIV_INPUT_AREA.style.display = "block";
  if (div == "main") DIV_MAIN_AREA.style.display = "block";
  if (div == "save") DIV_SAVE_MENU.style.display = "block";
  if (div == "view") DIV_VIEW_AREA.style.display = "block";
}
