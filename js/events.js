window.onclick = function click(event) {
  if (event) {
    const currentPost = document.querySelector('.currentPost');
    if (event.target.matches('.subreddit')) {
      document.getElementById('message').innerHTML = 'loading...';
      currentPost.style.backgroundColor = 'var(--background)';
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
    } else if (event.target.matches('#ytImg')) {
      document.getElementById('comments').style.display = 'block';
      window.scrollBy(0, 1); // youtube comments won't load unless movement is detected
      document.getElementById('redComments').style.display = 'none';
      document.getElementById('redImgWrap').style.display = 'flex';
    } else if (event.target.matches('#redImg')) {
      document.getElementById('comments').style.display = 'none';
      document.getElementById('redComments').style.display = 'block';
      document.getElementById('redImgWrap').style.display = 'none';
    }
  }
};

window.onchange = function change() {
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
