// =====================================================
// BUTTON PASSWORDS
// =====================================================

const SAVE_RECORD_PASSWORD = "2608";
const ADD_ITEM_PASSWORD = "fm618";
const VIEW_DATABASE_PASSWORD = "supad618";
const ADD_STOCK_PASSWORD = "fm618";
const VIEW_STOCK_PASSWORD = "st618";


// =====================================================
// PASSWORD AUTHENTICATION
// =====================================================

function authenticateButton(password, buttonName) {

  const enteredPassword = prompt(
    "🔐 Authentication required\n\n" +
    "Enter password to use:\n" +
    buttonName
  );

  // User pressed Cancel
  if (enteredPassword === null) {
    return false;
  }

  // Check password
  if (enteredPassword === password) {
    return true;
  }

  alert("❌ Incorrect password.");

  return false;
}

/* =====================================================
   GOOGLE APPS SCRIPT
===================================================== */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwMFeyliUhmgIuHeyBL9zkw6MuH4JLxIUxxnMT0okpAL-p5KJn02HUHCzqc0LybRoCd/exec";


const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1d1RkMpH3KcjDhAMWpJMA6W813hUYN-yosiUP2nUTMek/edit";


/* =====================================================
   DOM ELEMENTS
===================================================== */

const mainPage =
  document.getElementById("mainPage");


const result =
  document.getElementById("result");


const datePicker =
  document.getElementById("datePicker");


const counterList =
  document.getElementById("counterList");


const itemSelect =
  document.getElementById("itemSelect");


const saveButton =
  document.getElementById("saveButton");


const saveRecordButton =
  document.getElementById("saveRecordButton");


const addNewItemButton =
  document.getElementById("addNewItemButton");


const newItemId =
  document.getElementById("newItemId");


const newItemName =
  document.getElementById("newItemName");


const newItemType =
  document.getElementById("newItemType");


const viewSheetButton =
  document.getElementById("viewSheetButton");


/* =====================================================
   STOCK PAGE ELEMENTS
===================================================== */

const stockPage =
  document.getElementById("stockPage");


const addToStockButton =
  document.getElementById("addToStockButton");


const stockDate =
  document.getElementById("stockDate");


const stockList =
  document.getElementById("stockList");


const saveStockButton =
  document.getElementById("saveStockButton");


const backToCounterButton =
  document.getElementById("backToCounterButton");


/* =====================================================
   DATE
===================================================== */

/*
  Use local date instead of toISOString()
  so Bangladesh/local timezone does not accidentally
  produce the previous date.
*/

function getLocalDate() {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;

}


const today =
  getLocalDate();


datePicker.value =
  today;


stockDate.value =
  today;


/* =====================================================
   ALL ITEMS
===================================================== */

/*
  Format:

  [
    [ID, Name, Type],
    [ID, Name, Type]
  ]

  Type:

  p = Popular
  u = Unpopular
*/

let allItems = [];


/* =====================================================
   ACTIVE ITEMS
===================================================== */

/*
  IDs currently visible in the main counter.
*/

let activeItems =
  new Set();


/* =====================================================
   VIEW GOOGLE SHEET
===================================================== */

viewSheetButton.addEventListener(
  "click",
  () => {

    if (
      !authenticateButton(
        VIEW_DATABASE_PASSWORD,
        "View Current Database"
      )
    ) {
      return;
    }

    window.open(
      GOOGLE_SHEET_URL,
      "_blank"
    );

  }
);


/* =====================================================
   LOAD ITEMS
===================================================== */

async function loadItems() {

  try {

    console.log(
      "Loading products..."
    );


    const response =
      await fetch(
        GOOGLE_SCRIPT_URL +
        "?action=getItems"
      );


    if (!response.ok) {

      throw new Error(
        "Could not connect to Google Apps Script."
      );

    }


    const result =
      await response.json();


    console.log(
      "Google Apps Script response:",
      result
    );


    if (!result.success) {

      throw new Error(
        result.message ||
        "Could not load items."
      );

    }


    /* -----------------------------------------------
       Normalize items
    ----------------------------------------------- */

    allItems =
      (result.items || [])
        .map(
          item => {

            return [

              String(item[0]),

              String(item[1]),

              String(item[2])
                .toLowerCase()

            ];

          }
        );


    console.log(
      "Items loaded:",
      allItems
    );


    /* -----------------------------------------------
       Build interface
    ----------------------------------------------- */

    initializeItems();


  } catch (error) {

    console.error(
      "Could not load items:",
      error
    );


    alert(
      "Could not load products from Google Sheet.\n\n" +
      error.message
    );

  }

}


/* =====================================================
   INITIALIZE ITEMS
===================================================== */

function initializeItems() {


  /* -----------------------------------------------
     Reset active items
  ----------------------------------------------- */

  activeItems =
    new Set(

      allItems
        .filter(
          item =>
            item[2] === "p"
        )
        .map(
          item =>
            String(item[0])
        )

    );


  /* -----------------------------------------------
     Clear counter list
  ----------------------------------------------- */

  counterList.innerHTML =
    "";


  /* -----------------------------------------------
     Show popular items
  ----------------------------------------------- */

  allItems
    .filter(
      item =>
        item[2] === "p"
    )
    .forEach(
      item => {

        createCounterItem(
          item
        );

      }
    );


  /* -----------------------------------------------
     Update dropdown
  ----------------------------------------------- */

  updateDropdown();

}


/* =====================================================
   UPDATE DROPDOWN
===================================================== */

function updateDropdown() {

  itemSelect.innerHTML = `

    <option value="">
      Select an item...
    </option>

  `;


  allItems
    .filter(
      item =>
        item[2] === "u"
    )
    .forEach(
      item => {

        const id =
          String(item[0]);


        const name =
          String(item[1]);


        /* -----------------------------------------
           Only show items not already active
        ----------------------------------------- */

        if (
          !activeItems.has(id)
        ) {

          const option =
            document.createElement(
              "option"
            );


          option.value =
            id;


          option.textContent =
            name;


          itemSelect.appendChild(
            option
          );

        }

      }
    );

}


/* =====================================================
   ADD UNPOPULAR ITEM
===================================================== */

itemSelect.addEventListener(
  "change",
  () => {

    const selectedId =
      String(
        itemSelect.value
      ).trim();


    console.log(
      "Selected item ID:",
      selectedId
    );


    /* -----------------------------------------------
       Nothing selected
    ----------------------------------------------- */

    if (!selectedId) {

      return;

    }


    /* -----------------------------------------------
       Find selected item
    ----------------------------------------------- */

    const selectedItem =
      allItems.find(
        item =>
          String(item[0])
            .trim() === selectedId
      );


    console.log(
      "Selected item:",
      selectedItem
    );


    /* -----------------------------------------------
       Item not found
    ----------------------------------------------- */

    if (!selectedItem) {

      console.error(
        "Could not find selected item:",
        selectedId,
        allItems
      );


      alert(
        "Could not find the selected item."
      );


      itemSelect.value =
        "";

      return;

    }


    /* -----------------------------------------------
       Prevent duplicate
    ----------------------------------------------- */

    if (
      activeItems.has(
        selectedId
      )
    ) {

      itemSelect.value =
        "";

      return;

    }


    /* -----------------------------------------------
       Add to active items
    ----------------------------------------------- */

    activeItems.add(
      selectedId
    );


    /* -----------------------------------------------
       Add to main counter
    ----------------------------------------------- */

    createCounterItem(
      selectedItem
    );


    /* -----------------------------------------------
       Refresh dropdown
    ----------------------------------------------- */

    updateDropdown();


    itemSelect.value =
      "";

  }
);


/* =====================================================
   CREATE COUNTER ITEM
===================================================== */

function createCounterItem(item) {

  const id =
    String(item[0]);


  const name =
    String(item[1]);


  const type =
    String(item[2]);


  /* -----------------------------------------------
     Prevent duplicate visual item
  ----------------------------------------------- */

  const existing =
    counterList.querySelector(
      `.counter-item[data-item-id="${CSS.escape(id)}"]`
    );


  if (existing) {

    return;

  }


  /* -----------------------------------------------
     Create element
  ----------------------------------------------- */

  const counterItem =
    document.createElement(
      "div"
    );


  counterItem.className =
    "counter-item";


  counterItem.dataset.itemId =
    id;


  counterItem.innerHTML = `

    <span class="item-name">
      ${escapeHtml(name)}
    </span>


    <div class="controls">

      <button
        type="button"
        class="minus"
      >
        −
      </button>


      <span class="count">
        0
      </span>


      <button
        type="button"
        class="plus"
      >
        +
      </button>

    </div>

  `;


  /* -----------------------------------------------
     Get controls
  ----------------------------------------------- */

  const minusButton =
    counterItem.querySelector(
      ".minus"
    );


  const plusButton =
    counterItem.querySelector(
      ".plus"
    );


  const countElement =
    counterItem.querySelector(
      ".count"
    );


  /* -----------------------------------------------
     PLUS
  ----------------------------------------------- */

  plusButton.addEventListener(
    "click",
    () => {

      let count =
        Number(
          countElement.textContent
        );


      count++;


      countElement.textContent =
        count;

    }
  );


  /* -----------------------------------------------
     MINUS
  ----------------------------------------------- */

  minusButton.addEventListener(
    "click",
    () => {

      let count =
        Number(
          countElement.textContent
        );


      if (count > 0) {

        count--;

      }


      countElement.textContent =
        count;

    }
  );


  /* -----------------------------------------------
     Add to main list
  ----------------------------------------------- */

  counterList.appendChild(
    counterItem
  );


  console.log(
    "Counter item added:",
    id,
    name
  );

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHtml(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =====================================================
   PACKAGING COUNTER
===================================================== */

const packagingItems =
  document.querySelectorAll(
    ".packaging-item"
  );


packagingItems.forEach(
  item => {

    const minusButton =
      item.querySelector(
        ".pack-minus"
      );


    const plusButton =
      item.querySelector(
        ".pack-plus"
      );


    const countElement =
      item.querySelector(
        ".pack-count"
      );


    /* ---------------------------------------------
       PLUS
    --------------------------------------------- */

    plusButton.addEventListener(
      "click",
      () => {

        let count =
          Number(
            countElement.textContent
          );


        count++;


        countElement.textContent =
          count;

      }
    );


    /* ---------------------------------------------
       MINUS
    --------------------------------------------- */

    minusButton.addEventListener(
      "click",
      () => {

        let count =
          Number(
            countElement.textContent
          );


        if (count > 0) {

          count--;

        }


        countElement.textContent =
          count;

      }
    );

  }
);


/* =====================================================
   ADD NEW ITEM
===================================================== */

addNewItemButton.addEventListener(
  "click",
  async () => {

    if (
      !authenticateButton(
        ADD_ITEM_PASSWORD,
        "Add New Item"
      )
    ) {
      return;
    }

    const id =
      newItemId.value.trim();


    const name =
      newItemName.value.trim();


    const type =
      newItemType.value;


    /* -----------------------------------------------
       Validate ID
    ----------------------------------------------- */

    if (!id) {

      alert(
        "Please enter an Item ID."
      );


      newItemId.focus();

      return;

    }


    /* -----------------------------------------------
       Validate name
    ----------------------------------------------- */

    if (!name) {

      alert(
        "Please enter an Item Name."
      );


      newItemName.focus();

      return;

    }


    /* -----------------------------------------------
       Validate type
    ----------------------------------------------- */

    if (
      type !== "p" &&
      type !== "u"
    ) {

      alert(
        "Please select an item type."
      );

      return;

    }


    /* -----------------------------------------------
       Check duplicate ID
    ----------------------------------------------- */

    const existingId =
      allItems.some(
        item =>
          String(item[0])
            .trim() === id
      );


    if (existingId) {

      alert(
        "This Item ID already exists."
      );

      return;

    }


    /* -----------------------------------------------
       Check duplicate name
    ----------------------------------------------- */

    const existingName =
      allItems.some(
        item =>
          String(item[1])
            .trim()
            .toLowerCase() ===
          name.toLowerCase()
      );


    if (existingName) {

      alert(
        "This item name already exists."
      );

      return;

    }


    /* -----------------------------------------------
       Disable button
    ----------------------------------------------- */

    addNewItemButton.disabled =
      true;


    addNewItemButton.textContent =
      "Adding...";


    try {

      /* -------------------------------------------
         Send to Google Apps Script
      ------------------------------------------- */

      const response =
        await fetch(
          GOOGLE_SCRIPT_URL,
          {

            method:
              "POST",

            body:
              JSON.stringify({

                action:
                  "addItem",

                id:
                  id,

                name:
                  name,

                type:
                  type

              })

          }
        );


      /* -------------------------------------------
         Check HTTP response
      ------------------------------------------- */

      if (!response.ok) {

        throw new Error(
          "Could not connect to Google Apps Script."
        );

      }


      /* -------------------------------------------
         Read response
      ------------------------------------------- */

      const result =
        await response.json();


      console.log(
        "Add item response:",
        result
      );


      /* -------------------------------------------
         Check success
      ------------------------------------------- */

      if (!result.success) {

        throw new Error(
          result.message ||
          "Could not add item."
        );

      }


      /* -------------------------------------------
         Replace local items
      ------------------------------------------- */

      allItems =
        (result.items || [])
          .map(
            item => {

              return [

                String(item[0]),

                String(item[1]),

                String(item[2])
                  .toLowerCase()

              ];

            }
          );


      /* -------------------------------------------
         Rebuild interface
      ------------------------------------------- */

      initializeItems();


      /* -------------------------------------------
         Clear form
      ------------------------------------------- */

      newItemId.value =
        "";

      newItemName.value =
        "";

      newItemType.value =
        "u";


      /* -------------------------------------------
         Success
      ------------------------------------------- */

      addNewItemButton.textContent =
        "✓ Item Added";


      setTimeout(
        () => {

          addNewItemButton.textContent =
            "＋ Add New Item";

        },
        2000
      );


    } catch (error) {

      console.error(
        "Add item error:",
        error
      );


      alert(
        "Could not add item.\n\n" +
        error.message
      );


      addNewItemButton.textContent =
        "❌ Failed";


      setTimeout(
        () => {

          addNewItemButton.textContent =
            "＋ Add New Item";

        },
        2000
      );

    }


    addNewItemButton.disabled =
      false;

  }
);


/* =====================================================
   SAVE AS IMAGE
===================================================== */

saveButton.addEventListener(
  "click",
  async () => {

    saveButton.disabled =
      true;


    saveButton.textContent =
      "Creating image...";


    try {

      const canvas =
        await html2canvas(
          result,
          {

            backgroundColor:
              "#ffffff",

            scale:
              2,

            width:
              result.scrollWidth,

            height:
              result.scrollHeight

          }
        );


      const image =
        canvas.toDataURL(
          "image/png"
        );


      const link =
        document.createElement(
          "a"
        );


      link.download =
        `counter-${datePicker.value}.png`;


      link.href =
        image;


      link.click();


    } catch (error) {

      console.error(
        "Image error:",
        error
      );


      alert(
        "Could not create the image."
      );

    }


    saveButton.disabled =
      false;


    saveButton.textContent =
      "📷 Save as Image";

  }
);


/* =====================================================
   GET CURRENT RECORD
===================================================== */

function getCurrentRecord() {

  const selectedDate =
    datePicker.value;


  const now =
    new Date();


  const time =
    now.toLocaleTimeString(
      "en-GB",
      {

        hour:
          "2-digit",

        minute:
          "2-digit",

        second:
          "2-digit"

      }
    );


  const timestamp =
    `${selectedDate} ${time}`;


  /* =================================================
     ITEM COUNTS
  ================================================= */

  const itemCounts =
    {};


  /* -----------------------------------------------
     Start every item at 0
  ----------------------------------------------- */

  allItems.forEach(
    item => {

      const id =
        String(item[0]);


      itemCounts[id] =
        0;

    }
  );


  /* -----------------------------------------------
     Read visible counters
     
     IMPORTANT:
     The value is NEGATIVE when saved.
     
     Example:
     4 on screen → -4 in Google Sheet
  ----------------------------------------------- */

  document
    .querySelectorAll(
      ".counter-item"
    )
    .forEach(
      item => {

        const id =
          String(
            item.dataset.itemId
          );


        const countElement =
          item.querySelector(
            ".count"
          );


        if (
          id &&
          countElement
        ) {

          const count =
            Number(
              countElement.textContent
            );


          itemCounts[id] =
            -count;

        }

      }
    );


  /* =================================================
     PACKAGING COUNTS
  ================================================= */

  const packagingCounts =
    {};


  document
    .querySelectorAll(
      ".packaging-item"
    )
    .forEach(
      item => {

        const name =
          item
            .querySelector(
              "span"
            )
            .textContent
            .trim();


        const count =
          Number(
            item
              .querySelector(
                ".pack-count"
              )
              .textContent
          );


        packagingCounts[name] =
          count;

      }
    );


  /* =================================================
     COMMENT
  ================================================= */

  const comment =
    document
      .getElementById(
        "comment"
      )
      .value
      .trim();


  /* =================================================
     RETURN RECORD
  ================================================= */

  return {

    action:
      "saveRecord",

    timestamp:
      timestamp,

    date:
      selectedDate,

    time:
      time,

    itemCounts:
      itemCounts,

    itemNames:
      getItemNames(),

    packagingCounts:
      packagingCounts,

    comment:
      comment

  };

}


/* =====================================================
   GET ITEM NAMES
===================================================== */

function getItemNames() {

  const itemNames =
    {};


  allItems.forEach(
    item => {

      const id =
        String(item[0]);


      const name =
        String(item[1]);


      itemNames[id] =
        name;

    }
  );


  return itemNames;

}


/* =====================================================
   SAVE TO GOOGLE SHEET
===================================================== */

saveRecordButton.addEventListener(
  "click",
  async () => {

    if (
      !authenticateButton(
        SAVE_RECORD_PASSWORD,
        "Save to Record"
      )
    ) {
      return;
    }

    saveRecordButton.disabled = true;


    saveRecordButton.textContent =
      "Saving...";


    try {

      /* ---------------------------------------------
         Build record
      --------------------------------------------- */

      const record =
        getCurrentRecord();


      console.log(
        "Sending record:",
        record
      );


      /* ---------------------------------------------
         Send to Apps Script
      --------------------------------------------- */

      const response =
        await fetch(
          GOOGLE_SCRIPT_URL,
          {

            method:
              "POST",

            redirect:
              "follow",

            body:
              JSON.stringify(
                record
              )

          }
        );


      /* ---------------------------------------------
         Check response
      --------------------------------------------- */

      if (!response.ok) {

        throw new Error(
          "Could not connect to Google Apps Script."
        );

      }


      /* ---------------------------------------------
         Read response
      --------------------------------------------- */

      const result =
        await response.json();


      console.log(
        "Google response:",
        result
      );


      /* ---------------------------------------------
         Check success
      --------------------------------------------- */

      if (!result.success) {

        throw new Error(
          result.message ||
          "Google Sheet rejected the record."
        );

      }


      /* ---------------------------------------------
         Success
      --------------------------------------------- */

      saveRecordButton.textContent =
        "✓ Saved to Google Sheet";


      setTimeout(
        () => {

          saveRecordButton.textContent =
            "💾 Save to Record";

        },
        2000
      );


    } catch (error) {

      console.error(
        "Save error:",
        error
      );


      alert(
        "Could not save the record.\n\n" +
        error.message
      );


      saveRecordButton.textContent =
        "❌ Save Failed";


      setTimeout(
        () => {

          saveRecordButton.textContent =
            "💾 Save to Record";

        },
        2000
      );

    }


    saveRecordButton.disabled =
      false;

  }
);


/* =====================================================
   ADD TO STOCK
===================================================== */

/*
  Password protected.
*/

addToStockButton.addEventListener(
  "click",
  () => {

    /* -----------------------------------------------
       PASSWORD AUTHENTICATION
    ----------------------------------------------- */

    if (
      !authenticateButton(
        ADD_STOCK_PASSWORD,
        "ADD to Stock"
      )
    ) {

      return;

    }


    /* -----------------------------------------------
       Open stock page
    ----------------------------------------------- */

    mainPage.style.display =
      "none";

    stockPage.style.display =
      "block";


    stockDate.value =
      getLocalDate();


    buildStockList();

  }
);

/* =====================================================
   BUILD STOCK LIST
===================================================== */

/*
  Uses the exact same allItems array that was
  loaded from Google Sheets.

  Every product gets a number input.
*/

function buildStockList() {

  stockList.innerHTML =
    "";


  allItems.forEach(
    item => {

      const id =
        String(item[0]);


      const name =
        String(item[1]);


      const stockItem =
        document.createElement(
          "div"
        );


      stockItem.className =
        "stock-item";


      stockItem.dataset.itemId =
        id;


      stockItem.innerHTML = `

        <span class="item-name">
          ${escapeHtml(name)}
        </span>


        <input
          type="number"
          class="stock-input"
          min="0"
          step="1"
          inputmode="numeric"
          placeholder="0"
          data-item-id="${escapeHtml(id)}"
        >

      `;


      stockList.appendChild(
        stockItem
      );

    }
  );


  console.log(
    "Stock list created:",
    allItems.length,
    "products"
  );

}


/* =====================================================
   GET STOCK RECORD
===================================================== */

/* =====================================================
   GET STOCK RECORD
===================================================== */

function getStockRecord() {

  const selectedDate =
    stockDate.value;


  /* -----------------------------------------------
     Validate date
  ----------------------------------------------- */

  if (!selectedDate) {

    throw new Error(
      "Please select a stock date."
    );

  }


  const now =
    new Date();


  const time =
    now.toLocaleTimeString(
      "en-GB",
      {

        hour:
          "2-digit",

        minute:
          "2-digit",

        second:
          "2-digit"

      }
    );


  const timestamp =
    `${selectedDate} ${time}`;


  /* =================================================
     PRODUCT STOCK
  ================================================= */

  const stockCounts =
    {};


  /* -----------------------------------------------
     Start every product at 0
  ----------------------------------------------- */

  allItems.forEach(
    item => {

      const id =
        String(item[0]);


      stockCounts[id] =
        0;

    }
  );


  /* -----------------------------------------------
     Read product stock inputs
     
     These remain POSITIVE.
     
     Example:
     10 → +10
  ----------------------------------------------- */

  document
    .querySelectorAll(
      ".stock-input"
    )
    .forEach(
      input => {

        const id =
          String(
            input.dataset.itemId
          );


        const rawValue =
          input.value.trim();


        if (!rawValue) {

          stockCounts[id] =
            0;

          return;

        }


        const value =
          Number(rawValue);


        if (
          !Number.isFinite(value) ||
          value < 0 ||
          !Number.isInteger(value)
        ) {

          throw new Error(
            "Product stock quantity must be a whole number greater than or equal to 0."
          );

        }


        stockCounts[id] =
          value;

      }
    );


  /* =================================================
     PACKAGING STOCK
  ================================================= */

  const packagingCounts =
    {

      S: 0,

      M: 0,

      L: 0,

      XL: 0

    };


  /* -----------------------------------------------
     Read packaging stock inputs
     
     These are also POSITIVE.
     
     Example:
     S = 20 → +20
  ----------------------------------------------- */

  document
    .querySelectorAll(
      ".stock-packaging-input"
    )
    .forEach(
      input => {

        const packagingName =
          input.dataset.packaging;


        const rawValue =
          input.value.trim();


        if (!rawValue) {

          packagingCounts[
            packagingName
          ] = 0;

          return;

        }


        const value =
          Number(rawValue);


        if (
          !Number.isFinite(value) ||
          value < 0 ||
          !Number.isInteger(value)
        ) {

          throw new Error(
            "Packaging quantity must be a whole number greater than or equal to 0."
          );

        }


        packagingCounts[
          packagingName
        ] =
          value;

      }
    );


  /* =================================================
     RETURN STOCK RECORD
  ================================================= */

  return {

    action:
      "saveStock",

    timestamp:
      timestamp,

    date:
      selectedDate,

    time:
      time,

    stockCounts:
      stockCounts,

    packagingCounts:
      packagingCounts,

    itemNames:
      getItemNames()

  };

}


/* =====================================================
   SAVE STOCK
===================================================== */

saveStockButton.addEventListener(
  "click",
  async () => {

    saveStockButton.disabled =
      true;


    saveStockButton.textContent =
      "Saving...";


    try {

      /* ---------------------------------------------
         Build stock record
      --------------------------------------------- */

      const record =
        getStockRecord();


      console.log(
        "Sending stock record:",
        record
      );


      /* ---------------------------------------------
         Send to Google Apps Script
      --------------------------------------------- */

      const response =
        await fetch(
          GOOGLE_SCRIPT_URL,
          {

            method:
              "POST",

            redirect:
              "follow",

            body:
              JSON.stringify(
                record
              )

          }
        );


      /* ---------------------------------------------
         Check HTTP response
      --------------------------------------------- */

      if (!response.ok) {

        throw new Error(
          "Could not connect to Google Apps Script."
        );

      }


      /* ---------------------------------------------
         Read Google response
      --------------------------------------------- */

      const result =
        await response.json();


      console.log(
        "Stock save response:",
        result
      );


      /* ---------------------------------------------
         Check success
      --------------------------------------------- */

      if (!result.success) {

        throw new Error(
          result.message ||
          "Google Sheet rejected the stock record."
        );

      }


      /* ---------------------------------------------
         Success
      --------------------------------------------- */

      saveStockButton.textContent =
        "✓ Stock Saved";


      /* ---------------------------------------------
         Clear inputs
      --------------------------------------------- */

      document
  .querySelectorAll(
    ".stock-input, .stock-packaging-input"
  )
  .forEach(
    input => {

      input.value =
        "";

    }
  );


      setTimeout(
        () => {

          saveStockButton.textContent =
            "💾 Save Stock";

        },
        2000
      );


    } catch (error) {

      console.error(
        "Stock save error:",
        error
      );


      alert(
        "Could not save stock.\n\n" +
        error.message
      );


      saveStockButton.textContent =
        "❌ Save Failed";


      setTimeout(
        () => {

          saveStockButton.textContent =
            "💾 Save Stock";

        },
        2000
      );

    }


    saveStockButton.disabled =
      false;

  }
);


/* =====================================================
   BACK TO COUNTER
===================================================== */

backToCounterButton.addEventListener(
  "click",
  () => {

    stockPage.style.display =
      "none";


    mainPage.style.display =
      "block";

  }
);


/* =====================================================
   START APPLICATION
===================================================== */

/*
  loadItems() is called ONLY ONCE.
*/

loadItems();

// =====================================================
// SEE STOCK UPDATE
// =====================================================

const seeStockButton =
  document.getElementById(
    "seeStockButton"
  );


if (seeStockButton) {

  seeStockButton.addEventListener(
    "click",
    () => {

      /* -----------------------------------------------
         PASSWORD AUTHENTICATION
      ----------------------------------------------- */

      if (
        !authenticateButton(
          VIEW_STOCK_PASSWORD,
          "SEE STOCK UPDATE"
        )
      ) {

        return;

      }


      /* -----------------------------------------------
         Open stock update page
      ----------------------------------------------- */

      window.location.href =
        "stock.html";

    }
  );

}
