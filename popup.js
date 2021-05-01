chrome.storage.local.get('postArr', ({ postArr }) => {
  if (postArr.length === 0) {
    document.body.style.width = '200px';
    chrome.storage.local.get('url', ({ url }) => {
      document.getElementById(
        'message'
      ).innerHTML = `No posts found. <a class="submit" target="_blank" href="https://www.reddit.com/submit?url=${url}">Submit it</a>`;
    });
  } else {
    getSubreddits(postArr);
  }
});

// Gets and prints list of subreddits
function getSubreddits(data) {
  for (let i = 0; i < data.length; i++) {
    document.getElementById(
      'subreddits'
    ).innerHTML += `<div class="subreddit" id="${data[i].data.permalink}">${data[i].data.subreddit} (${data[i].data.num_comments})</div>`;

    if (i === 0) {
      document.getElementById(data[i].data.permalink).style.backgroundColor =
        'var(--light-grey)';
      document.getElementById(data[i].data.permalink).className +=
        ' currentPost';
      getPost(data[i], 1);
    } else {
      getPost(data[i], 0);
    }
  }
}

// Gets and print post info
function getPost(item, first) {
  fetch(chrome.runtime.getURL('/templates/post.html'))
    .then((response) => response.text())
    .then((template) => {
      Mustache.parse(template);
      const rendered = Mustache.render(template, {
        id: item.data.id,
        score: formatNumber(item.data.score),
        title: decodeHtml(item.data.title),
        permalink: item.data.permalink,
        date: convertDate(item.data.created_utc),
        author: item.data.author,
      });
      if (first === 1) {
        document.getElementById('posts').innerHTML += rendered;
        document.getElementById(`p_${item.data.permalink}`).style.display =
          'block';
        getComments(
          `https://api.reddit.com${item.data.permalink}`,
          item.data.permalink,
          false
        );
      } else {
        document.getElementById('posts').innerHTML += rendered;
      }
    });
}

// Gets list of comments from post
async function getComments(postUrl, post, loadMore) {
  let result;
  let json;
  let commentList;

  if (document.getElementById(`c_${post}`).innerHTML && !loadMore) {
    document.getElementById(`c_${post}`).style.display = 'block';
  } else {
    result = await fetch(postUrl);
    json = await result.json();
    if (
      json &&
      json[1] &&
      json[1].kind === 'Listing' &&
      json[1].data &&
      json[1].data.children.length
    ) {
      commentList = await Promise.all(json[1].data.children);
      showComments(commentList, post);
    }
  }
  document.getElementById('message').innerHTML = '';
}

// Prints comments
function showComments(commentList, post) {
  let loadID;
  let bodyHTML;

  fetch(chrome.runtime.getURL('/templates/comment.html'))
    .then((response) => response.text())
    .then((template) => {
      for (let i = 0; i < commentList.length; i++) {
        if (commentList[i].kind === 'more') {
          loadID = document.getElementById(
            commentList[i].data.parent_id.substring(3)
          );
          if (loadID) {
            loadID.innerHTML += `<div class="commentTitle loadMore" id="m_${commentList[i].data.children}">load more comments (${commentList[i].data.count})</div>`;
          } else {
            document.getElementById(
              `c_${post}`
            ).innerHTML += `<div class="commentTitle loadMore" id="m_${commentList[i].data.children}">load more comments (${commentList[i].data.count})</div>`;
          }
        } else {
          getReplies(commentList[i], post);
          bodyHTML = decodeHtml(commentList[i].data.body_html).replace(
            '<a href=',
            '<a target="_blank" href='
          );
          Mustache.parse(template);
          const rendered = Mustache.render(template, {
            id: commentList[i].data.id,
            author: commentList[i].data.author,
            score: formatNumber(commentList[i].data.score),
            date: convertDate(commentList[i].data.created_utc),
            bodyHTML,
          });

          if (commentList[i].data.parent_id.substring(0, 2) === 't1') {
            document.getElementById(
              commentList[i].data.parent_id.substring(3)
            ).innerHTML += rendered;
          } else {
            document.getElementById(`c_${post}`).innerHTML += rendered;
          }
        }
      }
    });
}

// Gets replies to comments
async function getReplies(comment, post) {
  if (comment.kind === 't1') {
    if (
      comment.data.replies &&
      comment.data.replies.kind === 'Listing' &&
      comment.data.replies.data.children
    ) {
      showComments(comment.data.replies.data.children, post);
    }
  }
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function formatNumber(num) {
  return Math.abs(num) > 9999
    ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(0)}k`
    : Math.sign(num) * Math.abs(num);
}

function convertDate(timestamp) {
  let diff = Date.now() - timestamp * 1000;

  if (diff < 1000) {
    return 'just now';
  }

  diff /= 1000;
  if (diff < 60) {
    return `${parseInt(diff, 10)} second${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 60;
  if (diff < 60) {
    return `${parseInt(diff, 10)} minute${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 60;
  if (diff < 24) {
    return `${parseInt(diff, 10)} hour${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 24;
  if (diff < 7) {
    return `${parseInt(diff, 10)} day${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 7;
  if (diff < 4) {
    return `${parseInt(diff, 10)} week${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 4;
  if (diff < 13) {
    return `${parseInt(diff, 10)} month${
      parseInt(diff, 10) === 1 ? '' : 's'
    } ago`;
  }

  diff /= 12;
  return `${parseInt(diff, 10)} year${parseInt(diff, 10) === 1 ? '' : 's'} ago`;
}

window.onclick = function click(event) {
  if (event) {
    const currentPost = document.querySelector('.currentPost');
    if (event.target.matches('.subreddit')) {
      document.getElementById('message').innerHTML = 'loading...';
      currentPost.style.backgroundColor = '#fff';
      document.getElementById(event.target.id).style.backgroundColor =
        'var(--light-grey)';

      document.getElementById(`p_${currentPost.id}`).style.display = 'none';
      document.getElementById(`p_${event.target.id}`).style.display = 'block';

      currentPost.className = 'subreddit';
      document.getElementById(event.target.id).className += ' currentPost';

      getComments(
        `https://api.reddit.com${event.target.id}`,
        event.target.id,
        false
      );
    } else if (event.target.matches('.loadMore')) {
      const children = event.target.id.substring(2).split(',');

      for (let i = 0; i < children.length; i++) {
        getComments(
          `https://api.reddit.com${currentPost.id}${children[i]}`,
          currentPost.id,
          true
        );
      }
      document.getElementById(event.target.id).style.display = 'none';
    }
  }
};

window.onchange = async function change() {
  const currentPost = document.querySelector('.currentPost').id;

  document.getElementById('message').innerHTML = 'loading...';
  document.getElementById(`c_${currentPost}`).innerHTML = '';

  getComments(
    `https://api.reddit.com${currentPost}?sort=${
      document.getElementById(`s_${currentPost}`).value
    }`,
    currentPost,
    true
  );
};
