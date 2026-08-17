// =====================================================
// GOOGLE APPS SCRIPT URL
// =====================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwMFeyliUhmgIuHeyBL9zkw6MuH4JLxIUxxnMT0okpAL-p5KJn02HUHCzqc0LybRoCd/exec";


// =====================================================
// DOM ELEMENTS
// =====================================================

const sheetName =
  document.getElementById(
    "sheetName"
  );


const stockList =
  document.getElementById(
    "stockList"
  );


const packagingList =
  document.getElementById(
    "packagingList"
  );


const backButton =
  document.getElementById(
    "backButton"
  );


// =====================================================
// LOAD STOCK
// =====================================================

async function loadStock() {

  try {

    console.log(
      "Loading stock..."
    );


    const response =
      await fetch(
        GOOGLE_SCRIPT_URL +
        "?action=getStock"
      );


    if (!response.ok) {

      throw new Error(
        "Could not connect to Google Apps Script."
      );

    }


    const result =
      await response.json();


    console.log(
      "Stock response:",
      result
    );


    if (!result.success) {

      throw new Error(
        result.message ||
        "Could not load stock."
      );

    }


    // -----------------------------------------------
    // Sheet name
    // -----------------------------------------------

    sheetName.textContent =
      result.sheetName;


    // -----------------------------------------------
    // Products
    // -----------------------------------------------

    displayStock(
      result.stock || {}
    );


    // -----------------------------------------------
    // Packaging
    // -----------------------------------------------

    displayPackaging(
      result.packaging || {}
    );


  } catch (error) {

    console.error(
      "Stock error:",
      error
    );


    stockList.innerHTML = `
      <div class="error">
        Could not load stock.<br><br>
        ${escapeHtml(error.message)}
      </div>
    `;


    packagingList.innerHTML = "";

  }

}


// =====================================================
// DISPLAY PRODUCT STOCK
// =====================================================

function displayStock(stock) {

  stockList.innerHTML = "";


  const names =
    Object.keys(stock);


  if (names.length === 0) {

    stockList.innerHTML = `
      <div class="loading">
        No products found.
      </div>
    `;

    return;

  }


  names.forEach(name => {

    const count =
      Number(stock[name]) || 0;


    const item =
      document.createElement("div");


    item.className =
      "stock-item";


    const nameElement =
      document.createElement("span");


    nameElement.className =
      "stock-name";


    nameElement.textContent =
      name;


    const countElement =
      document.createElement("span");


    countElement.className =
      "stock-count";


    countElement.textContent =
      formatNumber(count);


    // -----------------------------------------------
    // Color based on stock
    // -----------------------------------------------

    if (count < 0) {

      countElement.classList.add(
        "negative"
      );

    } else if (count > 0) {

      countElement.classList.add(
        "positive"
      );

    } else {

      countElement.classList.add(
        "zero"
      );

    }


    item.appendChild(
      nameElement
    );


    item.appendChild(
      countElement
    );


    stockList.appendChild(
      item
    );

  });

}


// =====================================================
// DISPLAY PACKAGING
// =====================================================

function displayPackaging(packaging) {

  packagingList.innerHTML = "";


  const sizes = [
    "S",
    "M",
    "L",
    "XL"
  ];


  sizes.forEach(size => {

    const count =
      Number(
        packaging[size]
      ) || 0;


    const item =
      document.createElement("div");


    item.className =
      "stock-item";


    const nameElement =
      document.createElement("span");


    nameElement.className =
      "stock-name";


    nameElement.textContent =
      "Packaging " + size;


    const countElement =
      document.createElement("span");


    countElement.className =
      "stock-count";


    countElement.textContent =
      formatNumber(count);


    if (count < 0) {

      countElement.classList.add(
        "negative"
      );

    } else if (count > 0) {

      countElement.classList.add(
        "positive"
      );

    } else {

      countElement.classList.add(
        "zero"
      );

    }


    item.appendChild(
      nameElement
    );


    item.appendChild(
      countElement
    );


    packagingList.appendChild(
      item
    );

  });

}


// =====================================================
// FORMAT NUMBER
// =====================================================

function formatNumber(number) {

  return Number(number)
    .toLocaleString("en-US");

}


// =====================================================
// HTML ESCAPE
// =====================================================

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


// =====================================================
// BACK BUTTON
// =====================================================

backButton.addEventListener(
  "click",
  () => {

    window.location.href =
      "index.html";

  }
);


// =====================================================
// START
// =====================================================

loadStock();