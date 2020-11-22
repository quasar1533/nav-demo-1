const $siteList = $(".site-list");
const $lastList = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
let hashMap = xObject || [
  { logo: "G", url: "https://github.com" },
  { logo: "W", url: "https://wangdoc.com" },
  { logo: "./images/bilibili.png", url: "https://bilibili.com" },
];

const render = (index) => {
  hashMap.slice(index).forEach((node) => {
    $(`<li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${node.url}</div>
          </div>
        </a>
      </li>`).insertBefore($lastList);
  });
};

render(0);

$(".add-button").on("click", () => {
  let url = prompt("请输入您想添加的网址");
  if (url && url.indexOf("https") !== 0) {
    url = "https://" + url;
    hashMap.push({
      logo: url[0],
      url: url,
    });
    render(-1);
  }
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
