const english_textarea: HTMLTextAreaElement = document.querySelector("#en");
const dothraki_textarea: HTMLTextAreaElement = document.querySelector("#dt");
const baseURL = "/api/translate";

async function translate(text): Promise<string> {
  if (!text || typeof text !== "string") return "";

  try {
    const resp_raw = await fetch(`${baseURL}?text=${text}`, {
      headers: { "X-Forwarded-For": "1.5.22.6" },
    });
    const resp = await resp_raw.json();

    console.log(resp);

    if (!resp?.success) {
      console.log(
        `error: something went wrong while translating the text`,
        resp.error
      );
      return "";
    } else {
      return resp?.contents?.translated;
    }
  } catch (err) {
    console.log(`err ---> ${err.message}`);
  }
}

let timeoutFn: ReturnType<typeof setTimeout> | undefined;

function throttle(func: () => void, timer?: number) {
  if (timeoutFn) return;

  timeoutFn = setTimeout(() => {
    func.call(null);
    timeoutFn = undefined;
  }, timer || 1000);
}

english_textarea.addEventListener("keyup", () => {
  throttle(() => {
    translate(english_textarea.value).then(
      (translation) => (dothraki_textarea.value = translation || "")
    );
  });
});

dothraki_textarea.addEventListener("focus", () => dothraki_textarea.blur());
