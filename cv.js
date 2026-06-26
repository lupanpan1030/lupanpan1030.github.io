const CV_FILES = {
  en: "cv.md",
  zh: "cv-cn.md",
};

const LANGUAGE_LABELS = {
  en: "Ethan Chen Lu - Online CV",
  zh: "卢郴 / Ethan Chen Lu - 在线简历",
};

function getInitialLanguage() {
  const hashLanguage = window.location.hash.replace("#", "").toLowerCase();

  if (hashLanguage === "zh" || hashLanguage === "cn") {
    return "zh";
  }

  if (hashLanguage === "en") {
    return "en";
  }

  return "en";
}

function setActiveLanguage(language) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = LANGUAGE_LABELS[language];

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === language;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

async function loadCV(language = "en") {
  const nextLanguage = CV_FILES[language] ? language : "en";
  const content = document.querySelector("#cv-content");

  setActiveLanguage(nextLanguage);
  content.innerHTML = "<p>Loading CV...</p>";

  try {
    const response = await fetch(CV_FILES[nextLanguage], { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Could not load ${CV_FILES[nextLanguage]}`);
    }

    const markdown = await response.text();
    content.innerHTML = marked.parse(markdown);

    const nextHash = nextLanguage === "zh" ? "#zh" : "#en";
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  } catch (error) {
    content.innerHTML =
      "<h1>CV unavailable</h1><p>The Markdown CV could not be loaded. Please refresh the page or open it through GitHub Pages.</p>";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      loadCV(button.dataset.language);
    });
  });

  document.querySelector("[data-print]").addEventListener("click", () => {
    window.print();
  });

  loadCV(getInitialLanguage());
});
