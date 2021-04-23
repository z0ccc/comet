"use strict";

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  url = url.replace("https://", "");
  url = url.replace("http://", "");
  url = url.replace("www.", "");
  getSubreddits(url);
});

async function getSubreddits(url) {
  var result;
  let index = url.indexOf("/"); // Gets the first index where a space occours
  let domain = url.substr(0, index); // Gets the first part
  let path = url.substr(index + 1);

  if (url.includes("?")) {
    index = url.indexOf("?");
    path = url.substr(index + 1);

    // console.log(domain);
    // console.log(path);

    if (domain == "youtube.com") {
      let pathYoutube = path.split("=");
      result = await fetch(
        "https://api.reddit.com/search/?q=site:youtube.com+OR+site:youtu.be+url:" +
          pathYoutube[1] +
          "&include_over_18=on&t=all&sort=top&limit=20"
      );
    } else {
      result = await fetch(
        "https://api.reddit.com/search/?q=site:" +
          domain +
          "+url:" +
          path +
          "&include_over_18=on&t=all&sort=top&limit=20"
      );
    }
  } else {
    result = await fetch(
      "https://api.reddit.com/search/?q=site:" +
        domain +
        "+url:" +
        path +
        "&include_over_18=on&t=all&sort=top&limit=20"
    );
  }

  // console.log(result);

  if (result.status === 200) {
    let json = await result.json();
    if (json && json.kind === "Listing" && json.data.children.length > 0) {
      showSubreddits(json.data.children);
    }
  }
}

async function showSubreddits(subs) {
  // let subs = await subList;
  // console.log(subs);
  var data = await Promise.all(subs);
  fetch(chrome.runtime.getURL("/templates/subreddit.html"))
    .then((response) => response.text())
    .then((template) => {
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].data.permalink);
        Mustache.parse(template);
        var rendered = Mustache.render(template, {
          permalink: data[i].data.permalink,
          name: data[i].data.subreddit,
          comments: data[i].data.num_comments,
        });
        document.getElementById("subreddits").innerHTML += rendered;

        if (i === 0) {
          document.getElementById(
            data[i].data.permalink
          ).style.backgroundColor = "var(--border)";
          getPost(data[i], 1);
        } else {
          getPost(data[i], 0);
        }
      }
    })
    .catch((error) =>
      console.log("Unable to get the template: ", error.message)
    );
}

async function getPost(item, first) {
  fetch(chrome.runtime.getURL("/templates/post.html"))
    .then((response) => response.text())
    .then(async template => {
      // console.log(item.data);
      Mustache.parse(template);
      var rendered = Mustache.render(template, {
        id: item.data.id,
        score: numFormatter(item.data.score),
        title: item.data.title,
        permalink: item.data.permalink,
        date: getDateStringFromTimestamp(item.data.created_utc),
        author: item.data.author,
      });
      if (first === 1) {
        document.getElementById("post").innerHTML += rendered;
        document.getElementById("p" + item.data.permalink).style.display =
          "flex";
        document.getElementById("sort").style.display = "block";

        getComments("https://api.reddit.com" + item.data.permalink);

      } else {
        document.getElementById("post").innerHTML += rendered;
      }
    })
    .catch((error) =>
      console.log("Unable to get the template: ", error.message)
    );
}

async function getComments(postUrl) {
  let result = await fetch(postUrl);

  if (result.status === 200) {
    let json = await result.json();

    if (
      json &&
      json[1] &&
      json[1].kind === "Listing" &&
      json[1].data &&
      json[1].data.children.length
    ) {
      // console.log(json[1].data.children);
      showComments(json[1].data.children);
    }
  }
  document.getElementById("message").innerHTML = "";
}

async function showComments(commentList) {
  var data = await Promise.all(commentList);
  fetch(chrome.runtime.getURL("/templates/comment.html"))
    .then((response) => response.text())
    .then(async template => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].kind == "more") {
          // console.log(data[i].data.children);
          document.getElementById(
            data[i].data.parent_id.substring(3)
          ).innerHTML +=
            '<div class="commentTitle loadMore" id="' + data[i].data.children + '">load more comments (' + data[i].data.count + ")</div>";
        } else {
          getReplies(data[i]);
          let body_html = decodeHtml(data[i].data.body_html).replace(
            "<a href=",
            "<a target='_blank' href="
          );
          Mustache.parse(template);
          var rendered = Mustache.render(template, {
            id: data[i].data.id,
            author: data[i].data.author,
            score: data[i].data.score,
            date: getDateStringFromTimestamp(data[i].data.created_utc),
            body_html: body_html,
          });

          if (data[i].data.parent_id.substring(0, 2) === "t1") {
            document.getElementById(
              data[i].data.parent_id.substring(3)
            ).innerHTML += rendered;
          } else {
            document.getElementById("comments").innerHTML += rendered;
          }
        }
      }
    })
    .catch((error) =>
      console.log("Unable to get the template: ", error.message)
    );
}

async function getReplies(comment) {
  if (comment.kind === "t1") {
    if (
      comment.data.replies &&
      comment.data.replies.kind === "Listing" &&
      comment.data.replies.data.children
    ) {
      showComments(comment.data.replies.data.children);
    }
  }
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function getDateStringFromTimestamp(timestamp) {
  // Diff in ms
  let diff = Date.now() - timestamp * 1000;
  if (diff < 1000) {
    return "just now";
  }
  // Diff in seconds
  diff /= 1000;
  if (diff < 60) {
    return `${parseInt(diff)} second${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in minutes
  diff /= 60;
  if (diff < 60) {
    return `${parseInt(diff)} minute${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in hours
  diff /= 60;
  if (diff < 24) {
    return `${parseInt(diff)} hour${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in days
  diff /= 24;
  if (diff < 7) {
    return `${parseInt(diff)} day${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in weeks
  diff /= 7;
  if (diff < 4) {
    return `${parseInt(diff)} week${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in months
  diff /= 4;
  if (diff < 13) {
    return `${parseInt(diff)} month${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }
  // Diff in years
  diff /= 12;
  if (diff < 7) {
    return `${parseInt(diff)} year${parseInt(diff) !== 1 ? "s" : ""} ago`;
  }

  return new Date(timestamp * 1000).toLocaleString();
}

function numFormatter(num) {
  return Math.abs(num) > 9999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(0) + "k"
    : Math.sign(num) * Math.abs(num);
}

window.onclick = async function (event) {
  var target = event.target;

  if (target.matches(".subreddit")) {
    document.getElementById("message").innerHTML = "Loading...";
    document.querySelectorAll(".subreddit").forEach((e) => {
      e.style.backgroundColor = "#fff";
    });

    document.getElementById(event.target.id).style.backgroundColor =
      "var(--border)";

    document.querySelectorAll(".postWrap").forEach((e) => {
      e.style.display = "none";
    });

    document.getElementById("p" + event.target.id).style.display = "flex";

    document.getElementById("comments").innerHTML = ""; //save comments instead of deleteing (chnage this)
    getComments("https://api.reddit.com" + event.target.id);
  } else if (target.matches(".loadMore")) {
    let children = event.target.id.split(",");
    for (let i = 0; i < children.length; i++) {
      getComments("https://api.reddit.com/r/hiphopheads/comments/mdg7uk/fresh_video_lil_nas_x_montero_call_me_by_your/" + children[i]);
    }
    document.getElementById(event.target.id).style.display = "none";
  }
};
