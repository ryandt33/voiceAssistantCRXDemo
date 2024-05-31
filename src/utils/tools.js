import { callOpenAI, generalCall } from "./chat";
import { load } from "cheerio";
import { summaryArray } from "./prompts";

const google_search = async ({ query }) => {
  window.location.href = `https://www.google.com/search?q=${query}`;
};

const follow_link = async ({ link }) => {
  const html = document.documentElement.outerHTML;

  const onlyATags = html.match(/<a[\s\S]*?<\/a>/g);

  const onlyHRefAndText = onlyATags
    .map((tag) => {
      const $ = load(tag);
      const href = $("a").attr("href");
      const text = $("a").text();
      if (href && text) {
        return {
          href,
          text,
        };
      }
    })
    .filter((x) => x);
  console.log(link, onlyHRefAndText);
  const response = await callOpenAI(JSON.stringify(onlyHRefAndText), link);

  // redirect to the website

  console.log(response);
  try {
    if (response !== "null") {
      // window.location.href = response.replaceAll("`", "");
      const resJson = JSON.parse(response);

      if (resJson.link) {
        window.location.href = resJson.link;
      }
    }
  } catch (error) {
    console.log(error);
  }

  // setLoading(false);
  // setSearchText("");
};

const summarize = async ({ instructions }) => {
  const allElements = document.querySelectorAll("*");
  const elementsWithLongText = Array.from(allElements)
    .filter(
      (el) =>
        el.textContent.replaceAll(/\s/g, "").length > 200 &&
        !el.textContent.replaceAll(/\s/g, "").includes("{")
    )
    .map((el) => el.textContent)
    .join("\n");

  console.log([
    ...summaryArray,
    `${elementsWithLongText}${
      instructions
        ? `\n\nThe user has specified the following instructions:
      
      ${instructions}`
        : ""
    }`,
  ]);

  const summary = await generalCall(
    "gpt-4o",
    summaryArray,
    `${elementsWithLongText}${
      instructions
        ? `\n\nThe user has specified the following instructions:
    
    ${instructions}`
        : ""
    }`
  );

  return summary.replaceAll("\n", "\n\n");
};

const multiple_choice_test = (params) => {
  console.log(params);
};

export default {
  follow_link,
  summarize,
  google_search,
  multiple_choice_test,
};
